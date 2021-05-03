import os
from decouple import config

class Config(object):
    basedir    = os.path.abspath(os.path.dirname(__file__))

    # Set up the App SECRET_KEY

    #SECRET_KEY = config('SECRET_KEY', default='S#perS3crEt_007')
    SECRET_KEY = config('SECRET_KEY', default=os.urandom(32))

class ProductionConfig(Config):
    DEBUG = False

    # Security
    SESSION_COOKIE_HTTPONLY  = True
    REMEMBER_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_DURATION = 3600


class DebugConfig(Config):
    DEBUG = True

# Load all possible configurations
config_dict = {
    'Production': ProductionConfig,
    'Debug'     : DebugConfig
}
