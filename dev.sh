#!/bin/bash
pushd $(dirname $0)

if [[ $1 == "gen" ]]; then
  # openapi gen docker container
  sudo -E docker run --rm -v `pwd`:/local openapitools/openapi-generator-cli generate \
    -i /local/openapigen/api.yml \
    -g typescript \
    -o /local/client/src/lib/api/generated/
elif [[ $1 == "build" ]]; then
  sudo -E docker-compose -f deploy/rbtgen_dev/docker-compose-rbtgen.yml up --build
else
  sudo -E docker-compose -f deploy/rbtgen_dev/docker-compose-rbtgen.yml up
fi

popd