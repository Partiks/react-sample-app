#!/usr/bin/env bash
echo "/n/n/n/n Creating users..."
mongo admin --host localhost -u admin -p 123 --eval "db.createUser({user: 'appuser', pwd: '456',roles: [{role: 'readWrite', db: 'partiks_db'}]}); db.createUser({user: 'admin4', pwd: '123', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]});"
echo "/n/n/n/n/n Users created. >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
