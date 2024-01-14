FROM node:lts-bookworm-slim

WORKDIR /app

RUN apt-get -y update
RUN apt-get -y install git
RUN git config --global --add safe.directory /app
CMD ["npm", "run", "dev"]
