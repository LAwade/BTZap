FROM node:alpine

RUN apk update

RUN apk add git vim

WORKDIR /usr/app

RUN git clone -b dev https://github.com/LAwade/BTZap.git

WORKDIR /usr/app/BTZap

RUN npm install

CMD ["npm", "start"]