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

Generator streames("produces") data with missing values into Kafka topics (kafka-network). Example kafka-network includes only 1 broker(no need for more for development purpose) and Apache Zookeeper (keeps track of status of the Kafka cluster node[s], topics, partitions etc.). Imputer/classifier "consumes" Kafka topic, imputes missing values with [SimpleImputer](https://scikit-learn.org/stable/modules/generated/sklearn.impute.SimpleImputer.html) and predicts label with [RandomForest](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html?highlight=random%20forest#sklearn.ensemble.RandomForestClassifier) classifier. The predicted labels and imputed data are send to InfluxDB(measurement time-series database). Grafana periodically queries InfluxDB and visualizes the data. Graph with labels has a fixed threshold at 0.5 to separate normal vs spam predictions (0 vs 1). It is not necessary to stream imputed data and labels back to Kafka topics in dev. scenario(more usefull in prod. for continuous evaluation of multiple models). Example train/test data included in the repo are from [UCI](https://archive.ics.uci.edu/ml/datasets/Spambase) - small size of the dataset.
* data streams - Kafka or Faust, well-known, well-supported, data is replicated on brokers, weel integrated with Python, Java, Scala, Spark etc.
* data processing - Python, Java + easy way to incorporate ML models lifecycle using MLflow, AirFlow, etc.
* data visualization - Grafana, nice interface
* data storage - time-series database supported by Grafana eg. InfluxDB
* Grafana periodically queries InfluxDB for new measurements, preconfiguration of datasource/provisionning and dashboard is based on the following [repo](https://github.com/cirocosta/sample-grafana)
* possibility to extend Grafana and InfluxDB with [Telegraf(CPU usage, memory usage, etc)](https://www.influxdata.com/time-series-platform/telegraf/), for more details see following [article](https://dev.to/rubenwap/monitor-the-behavior-of-your-python-app-by-learning-influxdb-grafana-and-telegraf-3ehg)
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
  * notebook uses function from [FIREMAN imputation repo](https://github.com/5uperpalo/FIREMAN-project_imputation)

## Monitoring

Grafana has a preloaded dashboard and configuration connecting to InfluxDB. Grafana GUI is provided at http://localhost:3000 , user/pass : admin/admin

<img src="https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/grafana_screenshot.PNG" height="320"/>

## Time synchronization issues
* **[Incorrect time]** the Grafana uses local time in the browser, ie. your system time. If you are running the docker in WSL under Windows [the WSL timeclock is not "ticking" when your comupter is at sleep](https://github.com/microsoft/WSL/issues/4245#issuecomment-508023086) and ```date``` in WSL will show different time than your OS time
  * **[SOLUTION]** update your WSL time ```ntpdate pool.ntp.org```
* **[Incorrect timezone]** command ```date``` in docker is showing incorrect timezone -> The Grafana has data shifted compared to your OS time
  * **[[SOLUTION]](https://serverfault.com/questions/683605/docker-container-time-timezone-will-not-reflect-changes)** set correct timezone env **TZ** in docker-compose file of each machine, tzdata is already installed. 

## Notes included in the repository:
* [TODO](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/TODO.MD)
* [NOTES](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/NOTES.MD), usefull notes
