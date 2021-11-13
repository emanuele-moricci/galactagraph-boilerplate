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
# src & services
COPY src /app/src
COPY services /app/services
COPY bin /app/bin
# micro-services preparation
RUN for dir in ./services/*; do cp $dir/.env.docker.test $dir/.env; done
RUN for dir in ./services/*; do cp $dir/.env.docker.test $dir/.env.test; done
# wait-for-it
RUN chmod +x /app/bin/wait-for-it.sh
# [END] > copy source files

RUN yarn install --frozen-lockfile

RUN chmod +x /app/bin/federation-bash/start-federation-docker.sh
RUN chmod +x /app/bin/federation-bash/start-federation-test.sh
RUN yarn build
CMD [ "yarn", "federation:docker" ]
