#!/usr/bin/env bash

for filename in $(ls ../server/bin/federation-utils/)
do
  for dir in ../server/services/*; do (cd "$dir" ; yarn add ../../bin/federation-utils/$filename); done
done;