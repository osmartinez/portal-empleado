FROM node:alpine

EXPOSE 4000

RUN mkdir /var/www/green
WORKDIR /var/www/green
COPY package.json /var/www/green/
COPY haproxy.cfg /var/www/green/
RUN npm install
COPY src/ /var/www/green/
