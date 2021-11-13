#!/usr/bin/env bash

for filename in $(ls ../server/bin/federation-utils/)
do
  (cd ../server ; yarn add ./bin/federation-utils/$filename);
  for dir in ../server/services/*; do 
    if [[ ${dir} != *"README"* ]]; then
      (cd "$dir" ; yarn add ../../bin/federation-utils/$filename);
    fi;
  done;
done;