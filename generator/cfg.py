import logging
import os

DATA_PATH = 'data/spam_test.csv'
LINES_PER_SECOND = float(os.environ.get('LINES_PER_SECOND'))
SLEEP_TIME = 1 / LINES_PER_SECOND
COLLECTOR_URL = os.environ.get('COLLECTOR_URL')

collector = {
    'url': 'http://'+COLLECTOR_URL+':5005/FIREMAN/SPAM',
    'username': 'SPAM',
    'password': 'password',
    }

logging_config = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "f": {
            "format": "[%(asctime)s] [%(name)s] [%(levelname)s] %(message)s"}
        },
    "handlers": {
        "stream": {
            "class": "logging.StreamHandler",
            "formatter": "f",
            "level": logging.INFO
            },
        "file": {
            "class": "logging.handlers.RotatingFileHandler",
            "filename": "/logs/generator.log",
            "mode": "a",
            "maxBytes": 100000,
            "backupCount": 5,
            "formatter": "f",
            "level": logging.INFO
            },
        },
    "loggers": {
        "": {
            "handlers": ["stream", "file"],
            "level": logging.INFO,
            "propagate": False
            },
        "root": {
            "handlers": ["stream", "file"],
            "level": logging.INFO,
            "propagate": False
            },
        }
    }