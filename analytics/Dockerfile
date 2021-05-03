FROM nikolaik/python-nodejs:python3.6-nodejs15

RUN mkdir -p /usr/app
WORKDIR /usr

ENV FLASK_APP run.py

COPY app /usr/app
COPY main.sh run.py gunicorn-cfg.py requirements.txt config.py /usr/

RUN pip install -r requirements.txt
RUN npm install --prefix /usr/app/base/static/assets/js kafka-node express socket.io

EXPOSE 5005
EXPOSE 3000
EXPOSE 3001

CMD ./main.sh
