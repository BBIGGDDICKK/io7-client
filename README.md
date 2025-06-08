# io7-management-web

This is the frontend Web for the io7 Platform and serves the user to manage the devices and the application key.


This repo is used to build the docker image io7lab/io7-web


## how to build docker image
```
npm install
npm run build
docker build . -t io7lab/io7-web
```


If you want to setup a development/test environment to study and/or to contribute, then setup the development environment of io7 platform with `io7-platform-cloud/setup/io7-platform-develop.sh`. And you will find the development environment with the dev/test run time as well.
