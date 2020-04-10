Parth's full-stack React-NodeJS-MongoDB boilerplate for testing CI/CD pipelines and various other automations.

Commands to run in the current directory:
docker-compose up -d --build

web: Web App is a ReactJS application which has 2 components: Hello and App. Only Hello component is used currently.

backend: This is the NodeJS backend application which communicates with the MongoDB database container.

db: Almost the plain MongoDB docker image. Just copying the init scripts into "/docker-entrypoint-initdb.d" directory, the .js or .sh files in which are automatically called by the mongo docker image by default for initialization puroses and creates initial users and inserts some dummy data into "partiks_db" database.

NOTE: the volume files shared in the docker-compose.yml is the default way of how the init javascript files should be shared but SELinux in all it's mighty wisdom makes for some weird errors like files not being accessible inside the container and where the permissions of file appear as "?? ?????? ??  ? ? ? ", so these files are being copied to the required directory manually.

For trying out just ReactJS in web/ directory:
docker build . -t partiks/sample_web:v1 && docker stop test_react && docker rm test_react && docker run -t --name test_react -p 8080:80 -d partiks/sample_web:v1
OR
docker run -t --name test_react -p 8080:80 -d partiks/sample_web:v1

For trying just NodeJS in backend/ directory:
docker build . -t partiks/sample_node_backend:v1 && docker stop test_node && docker rm test_node && docker run -t --name test_node -p 3000:3000 -d partiks/sample_node_backend:v1
OR
docker run -t --name test_node -p 3000:3000 -d partiks/sample_node_backend:v1

For trying just MongoDB in db/ directory:
docker build . -t partiks/sample_mongo:v1 && docker stop test_mongo && docker rm test_mongo && docker run -t --name test_mongo -p 8080:80 -d partiks/sample_web:v1
OR
docker run -t --name test_mongo -p 8080:80 -d partiks/sample_web:v1

Images are also available publicle use on Docker hub: partiks/sample_web, partiks/sample_node_backend, and sample_mongo
