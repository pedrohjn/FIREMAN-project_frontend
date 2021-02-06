FROM python:3.8-slim

WORKDIR /usr/app

RUN apt-get update \
	&& apt-get install -y --no-install-recommends tzdata \
        && apt-get clean \
        && rm -rf /var/lib/apt-get/lists/* /tmp/* /var/tmp/*

ADD ./requirements.txt ./
RUN pip install -r requirements.txt

ADD ./ ./

CMD ["python3", "app.py"]
