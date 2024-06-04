FROM node:21

COPY ["package.json", "/usr/src"]

WORKDIR /usr/src

RUN npm install
RUN npm install -g ts-node

COPY [".", "/usr/src/"]

EXPOSE 3000

