FROM node:alpine

EXPOSE 3000

WORKDIR /var/www
COPY package.json /var/www/
COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
RUN npm install
COPY src/ /var/www/
