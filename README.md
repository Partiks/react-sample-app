Parth's ReactJS boilerplate for testing CI/CD pipelines and various other automations.

Commands to run in the current directory:

docker build . -t partiks/sample_web:v1 && docker stop test && docker rm test && docker run -t --name test -p 8080:80 -d partiks/sample_web:v1

Image also available publicly on Docker hub: partiks/sample_web
