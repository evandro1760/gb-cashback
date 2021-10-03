FROM node:14.17.3

RUN mkdir -p /home/node/app/src && chown -R node:node /home/node/app
WORKDIR /home/node/app

USER root

COPY package.json . 
COPY package-lock.json . 

RUN npm install --production

COPY ./src ./src
COPY server.js .

EXPOSE 9000

CMD ["npm", "start"]