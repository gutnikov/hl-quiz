FROM node:8

WORKDIR /app

COPY . .

EXPOSE 3000
EXPOSE 8080

#install server deps
RUN npm install

# install client deps and build client
WORKDIR /app/client
RUN npm install
CMD nohup node ../server/server.js & npm run start
