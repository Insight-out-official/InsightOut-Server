#!/bin/bash
echo "🚀 pm2 restart"
source /home/ec2-user/.bash_profile

echo "yarn install"
yarn

pm2 stop all
pm2 start all