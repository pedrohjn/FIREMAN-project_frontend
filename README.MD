# FIREMAN-project Frontend repository

Machine learning prediction Frontend related to [FIREMAN project](https://fireman-project.eu/) and main [FIREMAN-project repository](https://github.com/5uperpalo/FIREMAN-project/).
Reporsitory is a work-in-progress project that is part of FIREMAN project activities. 

## Implementation design and cosiderations
TBD I am fucking tired, it has bee a long day 

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


## Monitoring

Grafana has a preloaded dashboard and configuration connecting to InfluxDB. Grafana GUI is provided at http://localhost:3000 , user/pass : admin/admin

![Grafana](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/img/grafana_screenshot.PNG "Grafana")

## Notes included in the repository:
* [todo list](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/TODO.MD)
* [notes](https://github.com/5uperpalo/FIREMAN-project_frontend/blob/main/NOTES.MD), eg. repositories and links I used
