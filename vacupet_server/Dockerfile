FROM node:21

RUN mkdir /usr/src/app
COPY ["package.json", "/usr/src/app"]


WORKDIR /usr/src/app

RUN npm install
RUN npm install -g ts-node

COPY [".", "/usr/src/app"]

EXPOSE 3000

