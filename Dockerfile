# syntax=

FROM node:18.16.1

# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install app dependencies
COPY . .
RUN npm install

CMD ["node", "src/main.js"]