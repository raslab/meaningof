#!/usr/bin/env bash

cd back
npm install
cd ..

cd front
npm install

rm ./src/config.js
mv ./src/config.js_prod ./src/config.js
npm run build
rm -rf ../back/public
mv build ../back/public