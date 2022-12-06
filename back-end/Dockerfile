FROM node:16

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY . .

RUN npm install




CMD ["node", "server.js"]
