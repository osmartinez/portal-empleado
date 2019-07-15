FROM node:alpine

EXPOSE 4000

WORKDIR /var/www/
COPY package.json /var/www/
COPY haproxy.cfg /var/www/
RUN npm install
COPY src/ /var/www/
