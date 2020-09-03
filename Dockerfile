FROM node:latest
WORKDIR /usr/src/
COPY . .
RUN npm install
EXPOSE 80
#VOLUME /usr/src/
CMD ["npm", "start"]