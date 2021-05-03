from app.home import blueprint
from flask import render_template
from flask_login import login_required, current_user
from app import login_manager

@blueprint.route('/index')
@login_required
def index():
    return render_template('index.html')

@blueprint.route('/example.html')
@login_required
def charts_example():
    return render_template('example.html')

@blueprint.route('/paintshop-charts.html')
@login_required
def charts_paintshop():
    return render_template('paintshop-charts.html')

@blueprint.route('/spindle-charts.html')
@login_required
def charts_spindle():
    return render_template('spindle-charts.html')

@blueprint.route('/uci-spam.html')
@login_required
def charts_uci_spam():
    return render_template('uci-spam.html')

@blueprint.route('/notifications-alerts.html')
@login_required
def notifications():
    return render_template('notifications-alerts.html')

@blueprint.route('/test-io-client.html')
def test_io():
    return render_template('test-io-client.html')
