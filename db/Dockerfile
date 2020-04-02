FROM mongo

RUN mkdir -p /apps/mongo

COPY ./mongo-init.js /apps/mongo/mongo-init.js

RUN chown -R mongodb:mongodb /apps/

EXPOSE 27017-27019

USER mongodb

#RUN mongo /apps/mongo/mongo-init.js

CMD ["mongod"]

