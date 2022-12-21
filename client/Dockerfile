#Author s164420, s184230

# syntax=docker/dockerfile:1

# To run server:
# sudo docker build --tag client .
# sudo docker run -d -p 3000:3000 client

# See https://github.com/nodejs/docker-node/blob/main/README.md#how-to-use-this-image
FROM node:lts

COPY ["package.json", "package-lock.json*", "./"]

# Build for production.
RUN npm install --legacy-peer-deps

# Install `serve` to run the application.
RUN npm install -g serve

COPY . .

RUN npm run build --production

# Set the command to start the node server.
CMD serve -p 3000 -s build
