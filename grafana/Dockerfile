FROM grafana/grafana:latest

USER root

ADD ./provisioning /etc/grafana/provisioning
ADD ./dashboards /var/lib/grafana/dashboards
ADD ./config.ini /etc/grafana/config.ini

RUN apk add --no-cache tzdata
