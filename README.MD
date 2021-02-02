# <img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/logo-fireman.png" height="64" />FIREMAN-project Frontend repository

Machine learning prediction Frontend related to [FIREMAN project](https://fireman-project.eu/) and main [FIREMAN-project repository](https://github.com/5uperpalo/FIREMAN-project/).
Repository is a work-in-progress project that is part of FIREMAN project activities. 
Skeleton of the repository is based on [Kafka Fraud Detector](https://github.com/florimondmanca/kafka-fraud-detector).

## Cosiderations and design

<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/main.png" height="320"/>

### Considerations
* emulate real-world IoT scenario
* pluggable approach, ie. easily add/swap imputer/classifer for Python, Java, or other implementation
* scalability 
* maintainability
* robustness 

### Design

Data with missing values is streamed("produced") by generated into Kafka network. Example Kafka network includes only 1 broker(no need for more for development purpose) and Apache Zookeeper (keeps track of status of the Kafka cluster node[s], topics, partitions etc.). Imputer/Classifier "consumes" Kafka topic, imputes missing values by sklear SimpleImputer and predicts label by sklearn RnadomForest classifier. The predicted labels and imputed data are send to InfluxDB(measurement time-series database). Grafana periodically queries InfluxDB and visualizes the data. Graph with labels has a fixed threshold at 0.5 to separate normal vs spam predictions (0 vs 1). It is not necessary to stream imputed data and labels back to Kafka topics in dev.scenario(more usefull in prod. for continuous evaluation of multiple models). Example train/test data included in the repo are from [UCI](https://archive.ics.uci.edu/ml/datasets/Spambase) - small size of dataset.
* data streams - Kafka or Faust, well-known, well-supported, data is replicated on brokers, weel integrated with Python, Java, Scala, Spark etc.
* data processing - Python, Java + easy way to incorporate ML models lifecycle using MLflow, AirFlow, etc.
* data visualization - Grafana, nice interface
* data storage - time series database supported by Grafana eg. InfluxDB
* Grafana periodically queries InfluxDB for new measurements, preconfiguration of datasource/provisionning and dashboard is based on the following [repo](https://github.com/cirocosta/sample-grafana), some parts of the dashboard are not being displayed properly - TBD
* possibility to extend Grafana and InfluxDB with (Telegraf(CPU usage, memory usage, etc))[https://www.influxdata.com/time-series-platform/telegraf/], for more details see following [article](https://dev.to/rubenwap/monitor-the-behavior-of-your-python-app-by-learning-influxdb-grafana-and-telegraf-3ehg)
* in case there is on aggregator for input stream it is possible to swap Kafka with [Faust(Python stream processing)](https://faust.readthedocs.io/en/latest/) or add KSQL to join/merge streams(Kafka topics) from sensors, eg. [solution with KSQL](https://medium.com/@ketulsheth2/streaming-data-pipeline-using-kafka-ksql-influxdb-and-grafana-8a934569fcb9)
* **[dev]** possibility to test new models using saved {Python, Java, R} models with corresponding [MLflow API](https://www.mlflow.org/docs/latest/index.html) on a local machine, for some ideas read following [article](https://towardsdatascience.com/how-to-build-a-real-time-fraud-detection-pipeline-using-faust-and-mlflow-24e787dd51fa)
* **[prod]** possibility to extend the design to production using [Apache Airflow](https://airflow.apache.org/) and [MLflow](https://mlflow.org/) to periodically update and track the models, see folllowing [article](https://medium.com/vantageai/keeping-your-ml-model-in-shape-with-kafka-airflow-and-mlflow-143d20024ba6)
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

## Monitoring

Grafana has a preloaded dashboard and configuration connecting to InfluxDB. Grafana GUI is provided at http://localhost:3000 , user/pass : admin/admin

<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/grafana_screenshot.PNG" height="320"/>

## Notes included in the repository:
* [todo list](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/TODO.MD)
* [notes](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/NOTES.MD), eg. repositories and links I used
