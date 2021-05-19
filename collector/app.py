import logging
import cfg
from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash
import json
from jsonschema import validate
#from influxdb import InfluxDBClient
from kafka import KafkaProducer
from datetime import datetime

logging.config.dictConfig(cfg.logging_config)
logger = logging.getLogger(__name__)

# load input schema
#input_schema = json.load(open(cfg.api['input_schema']))

# initialize app and api
app = Flask(__name__)
api = Api(app)
# authentication
auth = HTTPBasicAuth()
#users = {cfg.api['username']: generate_password_hash(cfg.api['password'])}

# producers for kafka stream and Influxdb
#client = InfluxDBClient(host='influxdb', port=8086, database='fireman')
#client.create_database('fireman')
producer = KafkaProducer(
    bootstrap_servers=cfg.KAFKA_BROKER_URL,
    # Encode all values as JSON
    value_serializer=lambda value: json.dumps(value).encode(),
)

def check_postdata(request):
    # check posted data
    #if request.is_json is True:
    posted_data = request.get_json(force=True)
        #posted_data = request.json
    #else:
    #    posted_data =  json.loads(request.data.decode("utf-8"))
    
    # for later usage
    #validate(instance=posted_data, schema=input_schema)    

    return posted_data

# @auth.verify_password
# def verify_password(username, password):
#     """
#     Simple helper function for basic http authetication

#     Parameters
#     ----------

#     Returns
#     ----------

#     """
#     if username in users and check_password_hash(users.get(username), password):
#         return username


class SPAM(Resource):
    """
    Forward REST API task, that forwards data to influxdb.

    Parameters
    ----------
    JSON : dict
        input variables defined in documentation

    Returns
    ----------
    dict
        dict containing collected data dhat is written to influxdb

    """
    # posting data for computation
    #@auth.login_required
    def post(self):
        try:
            #validate input, check session_id, check input request content-type (json/text)   
            posted_data = check_postdata(request)
            #posted_data['timestamp'] = datetime.now().strftime('%H:%m:%S')
            #logger.info(posted_data)
            producer.send('spam_data', value=posted_data)
            #result = [
            #    {"measurement": "data", 
            #    "tags": {},
            #    "fields": posted_data
            #    }
            #    ]
            #client.write_points(result)

        except Exception as ValidationError:
            return jsonify({"state": "ERROR",
                            "messages": [str(ValidationError)] })
    pass


api.add_resource(SPAM, "/FIREMAN/SPAM")
