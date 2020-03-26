FROM txnexus.mouser.lan:14101/mouser/base-images/centos:7

WORKDIR /apps

RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -

RUN yum install nodejs -y

RUN yum install epel-release -y && yum install nginx -y

RUN node --version

RUN npm --version

RUN npm install yarn -g

COPY config-overrides.js /apps/config-overrides.js

COPY public/ /apps/public/

COPY src/ /apps/src/

RUN ls -la

COPY package.json /apps/package.json

RUN yarn install

COPY customize-cra/ /apps/node_modules/customize-cra/

RUN rm -rf /usr/share/nginx/html/

RUN ls -la /apps/public

RUN yarn build

RUN ln -s /apps/build /usr/share/nginx/html

EXPOSE 80

COPY Dockerfile /apps/Dockerfile

CMD ["nginx", "-g", "daemon off;"]
