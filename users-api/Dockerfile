FROM node:14-buster
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build
EXPOSE 3000/tcp
CMD ["yarn", "start"]