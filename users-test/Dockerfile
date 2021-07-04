FROM node:14-buster
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
CMD "yarn" "test"