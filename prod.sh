#!/bin/bash
pushd $(dirname $0)

docker-compose -f deploy/rbtgen_prod/docker-compose-rbtgen.yml up

popd
