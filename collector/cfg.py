import logging
import os

KAFKA_BROKER_URL = os.environ.get('KAFKA_BROKER_URL')

api = {
    'username' : 'SPAM',
    'password' : 'password',
    'input_schema': 'validation_schema/in_schema.txt',
    'output_schema': 'validation_schema/out_schema.txt',
    }

logging_config = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'f': {
            'format': '[%(asctime)s] [%(name)s] [%(levelname)s] %(message)s'}
        },
    'handlers': {
        'stream': {
            'class': 'logging.StreamHandler',
            'formatter': 'f',
            'level': logging.INFO
            },
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': '/logs/collector.log',
            'mode': 'a',
            'maxBytes': 100000,
            'backupCount': 5,
            'formatter': 'f',
            'level': logging.INFO
            },
        },
    'loggers': {
        '': {
            'handlers': ['stream', 'file'],
            'level': logging.INFO,
            'propagate': False
            },
        'root': {
            'handlers': ['stream', 'file'],
            'level': logging.INFO,
            'propagate': False
            },
        }
    }