#!/bin/bash

export NODE_PATH=/etc/nodejs/current
export PATH=$NODE_PATH/bin:$PATH
export DANGEROUSLY_DISABLE_HOST_CHECK=true

cd frontend
yarn install
yarn build
pm2 restart frontend

cd ../backend
yarn install
pm2 restart backend