FROM node:latest

WORKDIR /usr/src/

COPY . .

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]

