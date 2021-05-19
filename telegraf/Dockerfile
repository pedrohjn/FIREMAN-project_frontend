FROM telegraf:1.18.2

RUN apt-get update \
	&& apt-get install -y --no-install-recommends tzdata \
        && apt-get clean \
        && rm -rf /var/lib/apt-get/lists/* /tmp/* /var/tmp/*

#EXPORT INFLUX_TOKEN=_s18uY3D0hzLHQzJdYojAxg5v_Nh7MwH2c8D36Y2kZBFbIMx_qs7Zb11mXs_IMT3_mP2_DnxjkFJjmRxw1zbHw==
COPY telegraf.conf /etc/telegraf/telegraf.conf