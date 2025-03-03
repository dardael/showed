FROM node:lts-bookworm-slim

WORKDIR /app

RUN apt-get -y update
RUN apt-get -y install git
RUN git config --global --add safe.directory /app

EXPOSE 6006 

CMD ["npm", "run", "storybook"]
