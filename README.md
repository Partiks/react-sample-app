Parth's React-NodeJS-MongoDB boilerplate for testing CI/CD pipelines and various other automations.

Commands to run in the current directory:
docker-compose up -d --build

For just WEB directory:
docker build . -t partiks/sample_web:v1 && docker stop test && docker rm test && docker run -t --name test -p 8080:80 -d partiks/sample_web:v1

Images are also available publicly on Docker hub: partiks/sample_web and partiks/sample_node_backend
