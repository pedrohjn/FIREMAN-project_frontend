import json
import cfg
import logging
from logging.config import dictConfig
from joblib import load
from kafka import KafkaConsumer, KafkaProducer
import sklearn
import numpy as np
from datetime import datetime

dictConfig(cfg.logging_config)
logger = logging.getLogger(__name__)

classifier = load(cfg.RANDOM_FOREST_CLF)
imputer = load(cfg.SIMPLE_MEAN_IMP)

if __name__ == '__main__':
    consumer = KafkaConsumer(
        'spam_data',
        bootstrap_servers=cfg.KAFKA_BROKER_URL,
        value_deserializer=lambda value: json.loads(value),
    )
    producer = KafkaProducer(
        bootstrap_servers=cfg.KAFKA_BROKER_URL,
        value_serializer=lambda value: json.dumps(value).encode(),
    )
    for message in consumer:
        # get the data + merge with expeted dict to set missing keys to 'nan'
        data = message.value
        data.pop('timestamp', None)
        data = {**cfg.EXPECTED_MESSAGE, **data}
        
        feature_names = list(data.keys())
        data_values = list(data.values())
        # impute/predict, list needs to be reshaped to np array with 1 row
        imputed_data = imputer.transform(np.reshape(data_values, (1,-1)))
        label = classifier.predict(imputed_data)
        # transform list to single value - label[0] + 
        # need to transform to int https://stackoverflow.com/a/50916741/8147433
        producer.send('spam_predictions', value=json.dumps({'label': int(label[0]), 
                                                            'timestamp': datetime.now().strftime('%H:%m:%S')}))

        # DEBUG
        #logger.info(result)
