#!/usr/bin/env bash

for filename in $(ls ../server/bin/federation-utils/)
do
  (cd ../server ; yarn add ./bin/federation-utils/$filename);
  for dir in ../server/services/*; do 
    if [[ ${dir} != *"README"* ]]; then
      (mkdir -p $dir/bin/federation-utils/; cp ../server/bin/federation-utils/*.tgz $dir/bin/federation-utils/)
      (cd "$dir" ; yarn add ./bin/federation-utils/$filename);
    fi;
  done;
done;