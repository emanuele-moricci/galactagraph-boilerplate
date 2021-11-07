#!/usr/bin/env bash

source ..

# Federation Microservices start-up [START]

(cd ./services/federation-auth/ ; yarn apollo:update)
# [ADD NEW APOLLO COMMANDS ABOVE] <- DO NOT REMOVE - Needed for the generator to create micro-service commands seamlessly

# Federation Microservices start-up [END]

