#!/usr/bin/env bash

for filename in $(ls ../server/bin/federation-utils/)
do
  (cd ../server/services/federation-auth/ ; yarn add ../../bin/federation-utils/$filename)
  # [ADD NEW UTILS ADD COMMANDS ABOVE] <- DO NOT REMOVE - Needed for the generator to update the federation-utils library seamlessly
done;