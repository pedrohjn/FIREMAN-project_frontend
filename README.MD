# **DISCLAIMER** the repository is going through massive update and is currently not working
# <img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/logo-fireman.png" height="64" />FIREMAN-project Frontend repository

Machine learning prediction Frontend related to [FIREMAN project](https://fireman-project.eu/) and main [FIREMAN-project repository](https://github.com/5uperpalo/FIREMAN-project/).
Repository is a work-in-progress project that is part of FIREMAN project activities. 
Skeleton of the repository is based on [Kafka Fraud Detector](https://github.com/florimondmanca/kafka-fraud-detector) and the analytics dashboard on [CoreUI Flask](https://appseed.us/admin-dashboards/flask-dashboard-coreui)

## Cosiderations and design

<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/ml_pipeline.png" height="320"/>
<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/batch_model.png" height="160"/>
<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/stream_based_model.png" height="160"/>
<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/generator_model.png" height="100"/>
<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/imputer_model.png" height="100"/>

### Considerations
* emulate real-world IoT scenario
* pluggable approach, ie. easily add/swap imputer/classifer for Python, Java, or other implementation
* scalability 
* maintainability
* robustness 

### Design

Generator streams("produces") data with missing values to Collector by POST messages. Collector streams measurements to Kafka topics (kafka-network) for imidiate processing and to Timeseries database (TMDB - InfluxDB) for further use in new model training experiments in Airflow/MLflow/etc.. Example kafka-network includes only 1 broker(no need for more for development purpose) and Apache Zookeeper (keeps track of status of the Kafka cluster node[s], topics, partitions etc.). Imputer/classifier "consumes" Kafka topic, imputes missing values with [SimpleImputer](https://scikit-learn.org/stable/modules/generated/sklearn.impute.SimpleImputer.html) and predicts label with [RandomForest](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html?highlight=random%20forest#sklearn.ensemble.RandomForestClassifier) classifier. The predicted labels are send back to Kafka. Analytics dashboard consumes Kafka topics and visualizes them. Example train/test data included in the repo are from [UCI](https://archive.ics.uci.edu/ml/datasets/Spambase) - small size of the dataset.
* data streams - Kafka or Faust, well-known, well-supported, data is replicated on brokers, weel integrated with Python, Java, Scala, Spark etc.
* data processing - Python, Java + easy way to incorporate ML models lifecycle using MLflow, AirFlow, etc.
* data visualization - analytics dashboard created by Flask, Node JS, WebSocket and Chart JS
* data storage - time-series database, InfluxDB
* it is possible to swap Kafka client in collector with [Faust(Python stream processing)](https://faust.readthedocs.io/en/latest/) or add KSQL to join/merge streams(Kafka topics) from sensors, eg. [solution with KSQL](https://medium.com/@ketulsheth2/streaming-data-pipeline-using-kafka-ksql-influxdb-and-grafana-8a934569fcb9)
* **[dev]** possibility to test new models using saved {Python, Java, R} models with corresponding [MLflow API](https://www.mlflow.org/docs/latest/index.html) on a local machine, for some ideas read following [article](https://towardsdatascience.com/how-to-build-a-real-time-fraud-detection-pipeline-using-faust-and-mlflow-24e787dd51fa)
* possibility to train/test/track new models in [Apache Airflow](https://airflow.apache.org/) or [MLflow](https://mlflow.org/) to periodically update and track the models, see folllowing [article](https://medium.com/vantageai/keeping-your-ml-model-in-shape-with-kafka-airflow-and-mlflow-143d20024ba6)


## Starting/Running

Implementation is fully containerised. You will need Docker and Docker Compose to run it.

* create a Docker network called kafka-network to enable communication between the Kafka  
```bash
docker network create kafka-network
```
* create single-node Kafka cluster and run in the background
```bash
docker-compose -f docker-compose.kafka.yml up -d
```
* start the (i) data generator, (ii) imputer/classifier, (iii) InfluxDB and (iv) Grafana
```bash
docker-compose -f up -d
```

### Note
* [jupyter notebook](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/examples/example_models_n_data_preparation.ipynb) describes how we create simple imputer , classifier and dataset
  * notebook uses function from [FIREMAN imputation repo](https://github.com/5uperpalo/FIREMAN-project_imputation)

## Monitoring
Using adjusted [flask dashboard](https://github.com/app-generator/flask-dashboard-coreui).

<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/fireman_dashboard.png" height="320"/>

## Notes included in the repository:
* [TODO](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/TODO.MD)
* [NOTES](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/NOTES.MD), usefull notes

## Usefull Docker commands
```
# build dockerfile - must be run from folder with dockerfile definition
docker build -t [CONTAINER_TAG] .

# show list of images
docker images

# show list of containers
docker ps

# remove container (add -f parameter for forced remove)
docker rm [CONTAINER_TAG] -f

# remove image
docker image remove [IMAGE_NAME]

# start/stop container
docker start/stop [CONTAINER_TAG]

# run container with port forwarding
docker run -p container_port:local_port [IMAGE_NAME]

# run linux bash in container
docker exec -it [CONTAINER_TAG] /bin/bash
```