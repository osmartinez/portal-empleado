FROM node:alpine

EXPOSE 3000

RUN mkdir -p /var/www/blue
WORKDIR /var/www/blue/
COPY package.json /var/www/blue/
COPY haproxy.cfg /var/www/blue/
RUN npm install
COPY src/ /var/www/blue/
