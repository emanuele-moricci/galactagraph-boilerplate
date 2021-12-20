#!/usr/bin/env bash

source ..

for dir in ./services/*; do 
  if [[ ${dir} != *"README"* ]]; then
    (cd "$dir" ; yarn test);
  fi;
done