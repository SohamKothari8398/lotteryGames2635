#!/bin/bash

NODE_PATH=/etc/nodejs/current
YARN=$NODE_PATH/bin/yarn
PM2=$NODE_PATH/bin/pm2

cd frontend
${YARN} install
${YARN} build
${PM2} restart frontend

cd ../backend
${YARN} install
${PM2} restart backend

