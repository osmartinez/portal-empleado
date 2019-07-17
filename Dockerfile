FROM node:alpine

ARG PUERTO
ENV PUERTO ${PUERTO}

EXPOSE ${PUERTO}
WORKDIR /var/www/
COPY package.json /var/www/
RUN npm install
COPY src/ /var/www/
