FROM txnexus.mouser.lan:14101/mouser/base-images/centos:7

WORKDIR /apps

RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -

RUN yum install nodejs -y

RUN yum install epel-release -y && yum install nginx -y

RUN node --version

RUN npm --version

RUN echo "lul"

RUN npm install yarn -g

COPY config-overrides.js

COPY Dockerfile /apps/Dockerfile

COPY ./customize-cra ./node_modules/customize-cra

COPY public/ /apps/

COPY package.json /apps/package.json

RUN yarn install

RUN rm -rf /usr/share/nginx/html/

RUN yarn build

RUN ln -s /apps/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
