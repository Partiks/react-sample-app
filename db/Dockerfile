FROM mongo

COPY ./init-mongo.js /docker-entrypoint-initdb.d/init-mongo.js

COPY ./insert-data.js /docker-entrypoint-initdb.d/insert-data.js

EXPOSE 27017-27019

CMD ["mongod"]
