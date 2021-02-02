import json
import cfg
import logging
from logging.config import dictConfig
from joblib import load
from kafka import KafkaConsumer, KafkaProducer
from influxdb import InfluxDBClient
import sklearn
import numpy as np

dictConfig(cfg.logging_config)
logger = logging.getLogger(__name__)

client = InfluxDBClient(host='influxdb', port=8086, database='spam')
client.create_database('spam')

classifier = load(cfg.RANDOM_FOREST_CLF)
imputer = load(cfg.SIMPLE_MEAN_IMP)

if __name__ == '__main__':
    consumer = KafkaConsumer(
        cfg.DATA_TOPIC,
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
        data = {**cfg.EXPECTED_MESSAGE, **data}
        
        feature_names = list(data.keys())
        data_values = list(data.values())
        # impute/predict, list needs to be reshaped to np array with 1 row
        imputed_data = imputer.transform(np.reshape(data_values, (1,-1)))
        label = classifier.predict(imputed_data)

        # send the data to influxdb
        # tables(measurements) are automatically created]
        # [0] in imputed_data[0] - as it is a 2D array with 1 line [N_features x 1]
        result = [
            {"measurement": "imputed_data", 
            "tags": {},
            "fields": dict(zip(feature_names, imputed_data[0]))
            },
            {"measurement": "label", 
            "tags": {},
            "fields": {'label': label}
            }]
        client.write_points(result)

        # DEBUG
        #logger.info(result)
