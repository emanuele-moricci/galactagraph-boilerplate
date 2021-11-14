FROM node:16-alpine3.11 AS base

WORKDIR /app
RUN chmod -R 777 /app

RUN apk update && apk add bash && apk add curl

# [START] > copy source files
COPY package*.json yarn.lock /app/
COPY tsconfig.json /app/tsconfig.json
# environment files
COPY .env.docker.test /app/.env
COPY .env.docker.test /app/.env.test
COPY .env.example /app/.env.example
# bin & prisma & src
COPY bin /app/bin
COPY prisma /app/prisma
COPY src /app/src
# [END] > copy source files

RUN yarn install --frozen-lockfile

RUN yarn build
CMD yarn generate:reset && yarn start
