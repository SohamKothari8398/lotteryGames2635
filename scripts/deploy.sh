#!/bin/bash

GIT_REPO=git@github.com:XSAVLAB/UP365-Gaming.git
GIT_BRANCH=dev

git pull origin $GIT_BRANCH

cd frontend
yarn install
yarn build
pm2 --name frontend -i max restart yarn -- start

cd ../backend
yarn install
yarn build
pm2 --name backend -i max restart yarn -- start

