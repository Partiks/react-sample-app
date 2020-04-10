FROM node

RUN node --version
RUN npm --version

WORKDIR /srv/api

COPY package.json /srv/api/package.json

RUN npm install

COPY ./result/ ./result/

COPY ./models/ ./models/

COPY index.js /srv/api/index.js

EXPOSE 3000

CMD node index.js
