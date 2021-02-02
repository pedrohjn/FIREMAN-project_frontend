import json
import cfg
import logging
from logging.config import dictConfig
from time import sleep
from kafka import KafkaProducer
from influxdb import InfluxDBClient

dictConfig(cfg.logging_config)
logger = logging.getLogger(__name__)

client = InfluxDBClient(host='influxdb', port=8086, database='spam')
client.create_database('spam')

if __name__ == '__main__':
    producer = KafkaProducer(
        bootstrap_servers=cfg.KAFKA_BROKER_URL,
        # Encode all values as JSON
        value_serializer=lambda value: json.dumps(value).encode(),
    )
    while True:
        with open(cfg.DATA_PATH, "r") as file:
            lines = file.readlines()
            header = lines[0].strip().split(',')
            for line in lines[1:]:
                # do not include empty strings in generated stream 
                # (i) simulates real-world scenario
                # (ii) influxDB can't have mixed or empty strings in 1 feature/column
                line = line.strip().split(',')
                stripped_line = [(x,float(y)) for x, y in zip(header,line) if y] # noqa
                data = dict(stripped_line)
                # DEBUG
                # logger.info(data)
                # send the data to kafka topic
                producer.send(cfg.DATA_TOPIC, value=data)
                # send the data to influxdb
                result = [
                    {"measurement": "data", 
                    "tags": {},
                    "fields": data
                    }]
                client.write_points(result)


                sleep(cfg.SLEEP_TIME)
