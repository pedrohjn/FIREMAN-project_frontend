from flask import render_template, redirect, request, url_for
from flask_login import current_user, login_user, logout_user
from app import login_manager
from app.base import blueprint
from app.base.forms import LoginForm
from app.base.users import User, UsersDB

users_db = UsersDB()

@blueprint.route('/')
def route_default():
    return redirect(url_for('base_blueprint.login'))

@blueprint.route('/login', methods=['GET', 'POST'])
def login():
    login_form = LoginForm(request.form)
    #if 'login' in request.form:
    if login_form.validate_on_submit():
        
        # read form data
        username = request.form['username']
        password = request.form['password']
        
        # Check user and password
        if (username in users_db.users) and (password == users_db.get_user(username).get('password')):
            user = User(username, users_db.get_user(username).get('password'), users_db.get_user(username).get('id'))
            login_user(user)
            return redirect(url_for('base_blueprint.route_default'))

        # Something (user or pass) is not ok
        else:
            return render_template('accounts/login.html', msg='Wrong user or password', form=login_form)
    print(current_user)
    if not current_user.is_authenticated:
        return render_template( 'accounts/login.html',
                                form=login_form)
    return redirect(url_for('home_blueprint.index'))

@login_manager.user_loader
def load_user(userid):
    password = users_db.get_user_by_id(userid).get('password')
    username = users_db.get_user_by_id(userid).get('username')
    return User(username, password, userid)

@blueprint.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('base_blueprint.login'))

@login_manager.unauthorized_handler
def unauthorized_handler():
    return render_template('page-403.html'), 403

@blueprint.errorhandler(403)
def access_forbidden(error):
    return render_template('page-403.html'), 403

@blueprint.errorhandler(404)
def not_found_error(error):
    return render_template('page-404.html'), 404

@blueprint.errorhandler(500)
def internal_error(error):
    return render_template('page-500.html'), 500
