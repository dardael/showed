FROM node:lts-bookworm-slim

WORKDIR /app

RUN apt-get -y update
RUN apt-get -y install git
CMD ["npm", "run", "dev"]
