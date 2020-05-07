FROM mongo

COPY ./init-mongo.js /docker-entrypoint-initdb.d/init-mongo.js

COPY ./insert-data.js /docker-entrypoint-initdb.d/insert-data.js

COPY db_version.txt /db_version.txt

EXPOSE 27017

CMD ["mongod"]
