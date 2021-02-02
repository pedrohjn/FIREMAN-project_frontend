import logging
import os

DATA_PATH = 'data/spam_test.csv'
KAFKA_BROKER_URL = os.environ.get('KAFKA_BROKER_URL')
DATA_TOPIC = os.environ.get('DATA_TOPIC')
LINES_PER_SECOND = float(os.environ.get('LINES_PER_SECOND'))
SLEEP_TIME = 1 / LINES_PER_SECOND

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