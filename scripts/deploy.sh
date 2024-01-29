#!/bin/bash

PATH=$PATH:/etc/nodejs/current/bin

cd frontend
yarn install
yarn build
pm2 restart frontend

cd ../backend
yarn install
pm2 restart backend

