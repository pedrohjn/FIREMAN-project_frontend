FROM influxdb:latest

RUN apt-get update \
	&& apt-get install -y --no-install-recommends tzdata \
        && apt-get clean \
        && rm -rf /var/lib/apt-get/lists/* /tmp/* /var/tmp/*
