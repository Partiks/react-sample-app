FROM mongo

COPY ./init-mongo.js /docker-entrypoint-initdb.d/init-mongo.js

COPY ./insert-data.js /docker-entrypoint-initdb.d/insert-data.js

COPY db_version.txt /db_version.txt

EXPOSE 27017-27019

CMD ["mongod"]

#WORKDIR /apps/mongo

#RUN mkdir -p /apps/mongo


#COPY ./init-mongo.js /apps/mongo/init-mongo.js

#COPY ./insert-data.js /apps/mongo/insert-data.js

#RUN chown -R mongodb:mongodb /apps/

#RUN mongod --fork --syslog && mongo localhost:27017/admin /apps/mongo/init-mongo.js && mongod --dbpath /data/db --shutdown

#RUN mongod --fork --syslog && mongo  localhost:27017/partiks_db /apps/mongo/insert-data.js && mongod --dbpath /data/db --shutdown

#CMD ["mongod --fork --syslog && mongo localhost:27017/admin /apps/mongo/init-mongo.js && mongo -u test-user -p 456 localhost:27017/partiks_db /apps/mongo/insert-data.js && mongod --dbpath /data/db --shutdown && mongod"]
# Commented part, I was messing around so that everytime the container gets restarted the changes in insert-data would be applied but that's not how mongodb container was desgined to utilize the docker-entrypoint-initdb.d/ directory, and realized that my approach was wrong, no db should change or touch the database once it has been initalized successfully. So, dropping this idea.
