#!/bin/bash

GIT_REPO=git@github.com:XSAVLAB/UP365-Gaming.git
GIT_BRANCH=dev
NODEJS_PATH=/etc/nodejs/current/

git pull origin $GIT_BRANCH

cd frontend
yarn install
yarn build
# Stop existing frontend process
pm2 stop frontend
# Start frontend process
pm2 --name frontend -i max start "$NODEJS_PATH/bin/yarn start"

cd ../backend
yarn install
# Stop existing backend process
pm2 stop backend
# Start backend process
pm2 --name backend -i max start "$NODEJS_PATH/bin/yarn start"

