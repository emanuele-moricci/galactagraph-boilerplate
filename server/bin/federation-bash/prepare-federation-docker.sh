#!/usr/bin/env bash

source ..

# Federation Microservices Preparation [START]

if [[ "$1" == "--db-clean" ]]; then
for dir in ./services/*; do (cd "$dir" ; yarn generate:reset); done
fi;

# Federation Microservices Preparation [END]

##########################################################

# Federation Microservices start-up [START]

for dir in ./services/*; do 
  if [[ ${dir} != *"README"* ]]; then
    (cd "$dir" ; yarn publish:schema:docker);
  fi;
done

# Federation Microservices start-up [END]

