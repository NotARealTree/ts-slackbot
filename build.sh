#!/usr/bin/env bash
echo "Copying config file"
cp -f example-config.js config.js
echo "Running docker build"
docker build . -t notarealtree/ts-slackbot
echo "Done Building, run \"docker run notarealtree/ts-slackbot --net=host -h 127.0.0.1\""