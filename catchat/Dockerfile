FROM node:lts

WORKDIR /usr/app/

COPY package*.json ./

RUN npm ci --only=production

COPY ./build .

CMD [ "node", "index.js" ]
