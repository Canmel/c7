FROM node:8
LABEL authors="cipchk <cipchk@qq.com>"
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm config set registry https://registry.npm.taobao.org && npm i
COPY . .
RUN ng serve --proxy-config proxy.config.json
