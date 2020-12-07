#!/bin/bash

if [[ $1 == "build" ]]; then
  sudo -E docker-compose -f deploy/rbtgen_dev/docker-compose-rbtgen.yml up --build
else
  sudo -E docker-compose -f deploy/rbtgen_dev/docker-compose-rbtgen.yml up
fi