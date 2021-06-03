#!/bin/bash

# use while loop to check if influxd is running 
while true
do
    verifier=$(influx ping)
    if [[ $verifier == "OK" ]]
        then
            echo "Running initial setup"
            #influx setup --force --username admin --password adminadmin --org fireman --bucket fireman --token S7UsPhCb6gwukLBDxp-p7DpuXzqdeM_xDCaJBAF8koH4vaqyO-0rXg6NhWYSc1LvIyIF2j4KftumFV76gwfzSQ== --name fireman
            influx apply --org fireman --force True --file /tmp/fireman_spam_uci_template.yml
            break
        else
            echo "InfluxDB is not running yet"
            sleep 5
    fi
done