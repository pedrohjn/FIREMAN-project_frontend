FROM python:3.8-slim

WORKDIR /usr/app

RUN apt-get update \
	&& apt-get install -y --no-install-recommends tzdata \
        && apt-get clean \
        && rm -rf /var/lib/apt-get/lists/* /tmp/* /var/tmp/*

ADD ./requirements.txt ./
RUN pip install -r requirements.txt
ADD ./ ./

# listening ports, values are informational
EXPOSE 5005

# install requirements
RUN pip install -r /app/requirements.txt

# run gunicorn
CMD ["gunicorn", "--config", "gunicorn-cfg.py", "run:app"]
