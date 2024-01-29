#!/bin/bash

cd frontend
yarn install
yarn build
pm2 restart frontend

cd ../backend
yarn install
pm2 restart backend

