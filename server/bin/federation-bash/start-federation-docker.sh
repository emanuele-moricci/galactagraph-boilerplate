#!/usr/bin/env bash

source ..

# Federation Microservices Preparation [START]

if [[ "$1" == "--db-clean" ]]; then
for dir in ./services/*; do (cd "$dir" ; yarn generate:reset); done
fi;

# Federation Microservices Preparation [END]

##########################################################

# Federation Microservices start-up [START]

CMD=( concurrently "yarn start" );
for dir in ./services/*; do 
  if [[ ${dir} != *"README"* ]]; then
    CMD+=("\"cd ${dir} && yarn build && yarn start\""); 
  fi;
done

"${CMD[@]}"

# Federation Microservices start-up [END]

