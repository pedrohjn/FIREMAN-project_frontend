# <img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/logo-fireman.png" height="64" />FIREMAN-project Frontend repository

Machine learning prediction Frontend related to [FIREMAN project](https://fireman-project.eu/) and main [FIREMAN-project repository](https://github.com/5uperpalo/FIREMAN-project/).
Repository is a work-in-progress project that is part of FIREMAN project activities. 
Skeleton of the repository is based on [Kafka Fraud Detector](https://github.com/florimondmanca/kafka-fraud-detector).

## 1. Cosiderations and design

<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/solution_design.png" height="320"/>
<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/batch_model.png" height="160"/>

### 1.1. Considerations
* emulate real-world IoT scenario
* pluggable approach, ie. easily add/swap imputer/classifer for Python, Java, or other implementation
* scalability 
* maintainability
* robustness 

### 1.2. Design

Generator streams("produces") data with missing values to Collector by POST messages. Collector streams measurements to Kafka topics (kafka-network) for immediate processing and to TiMeseries DataBase (TMDB - InfluxDB) for further use in new model training experiments in Airflow/MLflow/etc.. Example kafka-network includes only 1 broker(no need for more for development purpose) and Apache Zookeeper (keeps track of status of the Kafka cluster node[s], topics, partitions etc.). Imputer/classifier "consumes" Kafka topic, imputes missing values with [SimpleImputer](https://scikit-learn.org/stable/modules/generated/sklearn.impute.SimpleImputer.html) and predicts label with [RandomForest](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html?highlight=random%20forest#sklearn.ensemble.RandomForestClassifier) classifier. The predicted labels are send back to Kafka. Telegraf(API) reads and consumes Kafka streams and forwards them to Analytics dashboard(InfluxDB 2.x) for visualization. Example train/test data included in the repo are from [UCI](https://archive.ics.uci.edu/ml/datasets/Spambase) - small size of the dataset.
* data streams - Kafka or Faust, well-known, well-supported, data is replicated on brokers, weel integrated with Python, Java, Scala, Spark etc.
* data processing - Python, Java + easy way to incorporate ML models lifecycle using MLflow, AirFlow, etc.
* data visualization - analytics dashboard provided by InfluxDB 2.x (prev solution was made in Flask, Node JS, Socket.IO and FusionCharts)
* data storage - time-series database, InfluxDB
* it is possible to swap Kafka client in collector with [Faust(Python stream processing)](https://faust.readthedocs.io/en/latest/) or add KSQL to join/merge streams(Kafka topics) from sensors, eg. [solution with KSQL](https://medium.com/@ketulsheth2/streaming-data-pipeline-using-kafka-ksql-influxdb-and-grafana-8a934569fcb9)
* **[dev]** possibility to test new models using saved {Python, Java, R} models with corresponding [MLflow API](https://www.mlflow.org/docs/latest/index.html) on a local machine, for some ideas read following [article](https://towardsdatascience.com/how-to-build-a-real-time-fraud-detection-pipeline-using-faust-and-mlflow-24e787dd51fa)
* possibility to train/test/track new models in [Apache Airflow](https://airflow.apache.org/) or [MLflow](https://mlflow.org/) to periodically update and track the models, see folllowing [article](https://medium.com/vantageai/keeping-your-ml-model-in-shape-with-kafka-airflow-and-mlflow-143d20024ba6)


## 2. Starting/Running

Implementation is fully containerised. You will need Docker and Docker Compose to run it.

* create a Docker network called kafka-network to enable communication between the Kafka  
```bash
docker network create storage
docker network create api
```
* create single-node Kafka cluster and run in the background
```bash
docker-compose -f docker-compose.kafka.yml up -d
```
* start the (i) data generator, (ii) imputer/classifier, (iii) InfluxDB and (iv) Analytics Dashboard
```bash
docker-compose -f docker-compose.yml up -d
```
### 2.1. Dashboard

Telegraf and Influxdb are preconfigured with initial password, organization, bucket and security token for mutual communication. For InfluxDB configuration see docker-compose.yml. Telegraf is also preconfigured to consume Kafka topics, see telegraf/telegraf.conf. Influxdb documentation does not include step necessary to load dashboard as resource when the database is intially started.
As workaround either (i) import the dashboard in GUI as shown on screenshots below, or (ii) issue a command to run script in the InfluxDB container that check if InfluxDB is running and import the previously export dasboard template.
```bash
docker exec influxdb './script.sh'
```
Current version of InfluxDB docker starts the influx service by ```influxd run``` command after all initial commands finished, as the dashboard imports neet the server to be already running this creates an issues with running scripts in the background at the startup.
* user/pass: admin/adminadmin
* dashboard location: influxdb/spam_uci_dataset.json

<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/dashboard_login.png" height="320"/>
<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/import_dashboard_01.png" height="320"/>
<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/import_dashboard_02.png" height="320"/>
<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/imported_dashboard.png" height="320"/>

## 3. Monitoring
### 3.1. **NEW** solution using InfluxDB 2.x dashboard
* easy to use, more flexible than prev solution (can include metrics monitoring docker containers from Telegraf)
* GUI accessible with user/pass admin/adminadmin
* telegraf communicates with infuxdb using token with predefined combination of [organization, bucket] and consumes topics [spam_data, spam_predictions], see /telegraf/telegraf.conf

<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/fireman_dashboard_01.png" height="320"/>
<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/fireman_dashboard_02.png" height="320"/>
<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/fireman_dashboard_03.png" height="320"/>

### 3.2. **PREV** solution
* using adjusted [flask dashboard](https://github.com/app-generator/flask-dashboard-coreui).

<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/fireman_dashboard_prev.png" height="320"/>

## 4. Usefull Docker commands
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

## 5. Note
* [jupyter notebook](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/examples/example_models_n_data_preparation.ipynb) describes how we create simple imputer , classifier and dataset
  * notebook uses functions from [FIREMAN imputation repo](https://github.com/5uperpalo/FIREMAN-project_imputation); this work refers to the activities of WP4 to be reported in D4.4.

## 6. Appendix
* [TODO](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/TODO.MD)
* [NOTES](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/NOTES.MD), usefull notes
