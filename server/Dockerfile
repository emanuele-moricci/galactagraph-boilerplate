FROM node:16-alpine3.11 AS base

WORKDIR /app
RUN chmod -R 777 /app

RUN apk update && apk add bash && apk add curl

# [START] > copy source files
COPY package*.json yarn.lock /app/
COPY tsconfig.json /app/tsconfig.json
# environment files
COPY .env.docker.test /app/.env
COPY .env.example /app/.env.example
# src & bin
COPY src /app/src
COPY bin /app/bin
# wait-for-it
RUN chmod +x /app/bin/wait-for-it.sh
# [END] > copy source files

RUN yarn install --frozen-lockfile

RUN chmod +x /app/bin/galactagraph-bash/prepare-federation-docker.sh
RUN chmod +x /app/bin/galactagraph-bash/start-federation-test.sh
RUN yarn build

CMD [ "yarn", "start" ]
