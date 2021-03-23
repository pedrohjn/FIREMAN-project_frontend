import json
import cfg
import logging
from logging.config import dictConfig
from time import sleep
import requests

dictConfig(cfg.logging_config)
logger = logging.getLogger(__name__)

if __name__ == '__main__':
    while True:
        with open(cfg.DATA_PATH, "r") as file:
            lines = file.readlines()
            header = lines[0].strip().split(',')
            for line in lines[1:]:
                # do not include empty strings in generated stream 
                # (i) simulates real-world scenario
                line = line.strip().split(',')
                stripped_line = [(x,float(y)) for x, y in zip(header,line) if y] # noqa
                data = dict(stripped_line)
                resp = requests.post(cfg.collector['url'], data=data,
                                    auth=(cfg.collector['username'], cfg.collector['password']))
                sleep(cfg.SLEEP_TIME)
