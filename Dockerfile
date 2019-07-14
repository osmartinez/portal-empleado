FROM node:alpine

EXPOSE 3000

WORKDIR /var/www
COPY package.json /var/www/
RUN npm install
COPY src/. /var/www/
