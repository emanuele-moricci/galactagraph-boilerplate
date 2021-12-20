#!/usr/bin/env bash

source ..

for dir in ./services/*; do (cd "$dir" ; yarn apollo:update); done