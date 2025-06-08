#!/bin/bash

if [ -f ./certs/iothub.crt ]
then
    /home/node/app/./node_modules/.bin/serve -s --ssl-cert certs/iothub.crt --ssl-key certs/iothub.key build
else
    /home/node/app/./node_modules/.bin/serve -s build
fi