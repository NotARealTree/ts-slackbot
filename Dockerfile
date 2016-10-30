FROM ubuntu:latest
MAINTAINER Francis Screene <francis.screene@gmail.com>
RUN apt-get update
RUN apt-get install -y curl \
&& apt-get install -y npm \
&& npm install -g n \
&& n latest
ADD ["app.js", "package.json", "/opt/ts-slackbot/"]
WORKDIR /opt/ts-slackbot
RUN npm install
CMD ["node", "/opt/ts-slackbot/app.js"]
