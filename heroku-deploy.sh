#!/usr/bin/env bash

cd back
npm install
cd ..

cd front
yarn install
sed -i 's/http:\/\/localhost:2020\/api/https:\/\/meaning-of-web.herokuapp.com/\/api/g' ./src/config.js
yarn build
rm -rf ../back/public
mv build ../back/public