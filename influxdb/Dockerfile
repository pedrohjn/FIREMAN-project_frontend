FROM influxdb:2.0.6

ADD ./fireman_spam_uci_template.yml /tmp/

COPY script.sh /
RUN chmod +x /script.sh

RUN apt-get update \
	&& apt-get install -y --no-install-recommends tzdata\
    && apt-get clean \
    && rm -rf /var/lib/apt-get/lists/* /var/tmp/* 
