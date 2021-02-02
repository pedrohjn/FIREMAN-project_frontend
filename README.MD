# ![FIREMAN](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/logo-fireman.png =32x32) FIREMAN-project Frontend repository

Machine learning prediction Frontend related to [FIREMAN project](https://fireman-project.eu/) and main [FIREMAN-project repository](https://github.com/5uperpalo/FIREMAN-project/).
Reporsitory is a work-in-progress project that is part of FIREMAN project activities. 
Skeleton of the repository is based on [Kafka Fraud Detector](https://github.com/florimondmanca/kafka-fraud-detector).

## Implementation design and cosiderations
![design](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/main.png "design")
### Considerations
* emulate real-world IoT scenario
* pluggable approach, ie. easily add/swap imputer/classifer for other Python or Java implementation
* scalability 
* maintainability
* robustness 

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

![Grafana](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/grafana_screenshot.PNG =20x)

## Notes included in the repository:
* [todo list](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/TODO.MD)
* [notes](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/NOTES.MD), eg. repositories and links I used
