# Slack Teamspeak Status Integration Thing

## Purpose

The bot should tell you how many people there are on your teamspeak, as well as their names.

## Setup

1. Pull the [docker image](https://hub.docker.com/r/notarealtree/ts-slackbot/) using `docker pull notarealtree/ts-slackbot`.
2. Fill out the example config file with your parameters. (Optionally rename it to `config.js`)

## Running

This image uses an externally injected config file. To do this, run it with the following command:

```docker run -d -v /your/config/file/path/config.js:/opt/ts-slackbot/config.js notarealtree/ts-slackbot```

## License

This project is MIT licensed.