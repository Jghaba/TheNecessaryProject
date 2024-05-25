FROM node:18-alpine

ENV NODE_ENV=development

WORKDIR /var/www/app

COPY package.json /var/www/app/package.json

COPY . /var/www/app

RUN npm install

CMD ["npm","run","dev"]

