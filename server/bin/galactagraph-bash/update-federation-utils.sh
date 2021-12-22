#!/usr/bin/env bash

for filename in $(ls ../server/bin/galactagraph-utils/)
do
  (cd ../server ; yarn add ./bin/galactagraph-utils/$filename --ignore-engines);
  for dir in ../server/services/*; do 
    if [[ ${dir} != *"README"* ]]; then
      (mkdir -p $dir/bin/galactagraph-utils/; cp ../server/bin/galactagraph-utils/*.tgz $dir/bin/galactagraph-utils/)
      (cd "$dir" ; yarn add ./bin/galactagraph-utils/$filename --ignore-engines);
    fi;
  done;
done;