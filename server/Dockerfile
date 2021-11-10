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
RUN cp /app/services/federation-auth/.env.docker.test /app/services/federation-auth/.env
RUN mv /app/services/federation-auth/.env.docker.test /app/services/federation-auth/.env.test
# [ADD NEW ENV CLONE COMMANDS ABOVE] <- DO NOT REMOVE - Needed for the generator to create micro-service commands seamlessly
# wait-for-it
RUN chmod +x /app/bin/wait-for-it.sh
# [END] > copy source files

RUN yarn install --frozen-lockfile

RUN chmod +x /app/bin/start-federation-docker.sh
RUN chmod +x /app/bin/start-federation-test.sh
RUN yarn build
CMD [ "yarn", "federation:docker" ]
