FROM telegraf:1.18.2

RUN apt-get update \
	&& apt-get install -y --no-install-recommends tzdata \
        && apt-get clean \
        && rm -rf /var/lib/apt-get/lists/* /tmp/* /var/tmp/*

COPY telegraf.conf /etc/telegraf/telegraf.conf