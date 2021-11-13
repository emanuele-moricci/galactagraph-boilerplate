#!/usr/bin/env bash

source ..

for dir in ./services/*; do (cd "$dir" ; yarn add -D @apollo/rover@0.3.0 && yarn apollo:update); done