FROM node:21

COPY ["package.json", "/usr/src"]

WORKDIR /usr/src

ENV NODE_OPTIONS="--max_old_space_size=4096"


RUN npm install -g @angular/cli
RUN npm install

COPY [".", "/usr/src/"]

EXPOSE 4200
