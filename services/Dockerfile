FROM node

RUN node --version
RUN npm --version

WORKDIR /srv/api

COPY package.json /srv/api/package.json

RUN npm install

COPY index.js /srv/api/index.js

COPY ./result/ ./result/

EXPOSE 3000

CMD node index.js
