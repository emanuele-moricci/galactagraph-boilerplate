# [START] > Bootstrap the OS
FROM node:16-alpine3.14

WORKDIR /app
RUN chmod -R 777 /app

RUN apk update && \
    apk add bash=5.1.4-r0 && \
    apk add curl=7.79.1-r0
# [END] > Bootstrap the OS

# [START] > copy source files
COPY src /app/src
COPY bin /app/bin
COPY package*.json yarn.lock tsconfig.json .env.example /app/
COPY .env.docker.test /app/.env
# [END] > copy source files

# [START] > install and run the service
RUN yarn install --frozen-lockfile && \
    yarn cache clean

RUN chmod +x /app/bin/wait-for-it.sh
RUN chmod +x /app/bin/galactagraph-bash/prepare-federation-docker.sh
RUN chmod +x /app/bin/galactagraph-bash/start-federation-test.sh
RUN yarn build

CMD [ "yarn", "start" ]
# [END] > install and run the service