import logging
import os

EXPECTED_MESSAGE = {'Cont_1': 'nan', 'Cont_2': 'nan', 'Cont_3': 'nan', 'Cont_4': 'nan',
'Cont_5': 'nan', 'Cont_6': 'nan', 'Cont_7': 'nan', 'Cont_8': 'nan', 'Cont_9': 'nan',
'Cont_10': 'nan', 'Cont_11': 'nan', 'Cont_12': 'nan', 'Cont_13': 'nan', 'Cont_14': 'nan',
'Cont_15': 'nan', 'Cont_16': 'nan', 'Cont_17': 'nan', 'Cont_18': 'nan', 'Cont_19': 'nan',
'Cont_20': 'nan', 'Cont_21': 'nan', 'Cont_22': 'nan', 'Cont_23': 'nan', 'Cont_24': 'nan',
'Cont_25': 'nan', 'Cont_26': 'nan', 'Cont_27': 'nan', 'Cont_28': 'nan', 'Cont_29': 'nan',
'Cont_30': 'nan', 'Cont_31': 'nan', 'Cont_32': 'nan', 'Cont_33': 'nan', 'Cont_34': 'nan',
'Cont_35': 'nan', 'Cont_36': 'nan', 'Cont_37': 'nan', 'Cont_38': 'nan', 'Cont_39': 'nan',
'Cont_40': 'nan', 'Cont_41': 'nan', 'Cont_42': 'nan', 'Cont_43': 'nan', 'Cont_44': 'nan',
'Cont_45': 'nan', 'Cont_46': 'nan', 'Cont_47': 'nan', 'Cont_48': 'nan', 'Cont_49': 'nan',
'Cont_50': 'nan', 'Cont_51': 'nan', 'Cont_52': 'nan', 'Cont_53': 'nan', 'Cont_54': 'nan',
'Cont_55': 'nan', 'Cont_56': 'nan', 'Cont_57': 'nan'}

RANDOM_FOREST_CLF = 'scikit-learn_clf_model/rf.joblib'
SIMPLE_MEAN_IMP = 'scikit-learn_imp_model/simple_mean.joblib'
KAFKA_BROKER_URL = os.environ.get('KAFKA_BROKER_URL')
DATA_TOPIC = os.environ.get('DATA_TOPIC')

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
            "filename": "/logs/classifier.log",
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