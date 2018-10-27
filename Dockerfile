FROM node:carbon

# Создать директорию app

RUN apt-get update
RUN apt-get install -y git
RUN git clone  https://github.com/vlzkonopatov/web3.js.git

WORKDIR /web3.js


RUN npm install

CMD [ "node", "./example/node-app.js" ]
