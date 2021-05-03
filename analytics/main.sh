#!/bin/bash
nohup bash -c "node app/base/static/assets/js/consumer_predictions.js & node app/base/static/assets/js/consumer_data.js &"
gunicorn --config gunicorn-cfg.py run:app