#!/bin/bash

export NODE_PATH=/etc/nodejs/current
export PATH=$NODE_PATH/bin:$PATH

cd frontend
yarn install
yarn build
pm2 restart frontend

cd ../backend
yarn install
pm2 restart backend

