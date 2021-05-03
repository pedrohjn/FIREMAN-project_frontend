from flask_login import UserMixin
from app import login_manager

class User(UserMixin):

    def __init__(self , username , password, idd):
        self.id = idd
        self.username = username
        self.password = password


class UsersDB:

    def __init__(self):
        self.users = dict({'admin': {'id': 1,
                                    'password': 'admin'}})
        self.users_id_dict  = dict({'1': {'username': 'admin',
                                          'password': 'admin'}})
    def get_user(self, username):
        return self.users.get(username)

    def get_user_by_id(self, userid):
        return self.users_id_dict.get(userid)

