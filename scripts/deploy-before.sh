#!/bin/bash
echo "💡deploy before"
if [ -d /home/ec2-user/13th-4team-backend ]; then
    sudo rm -rf /home/ec2-user/13th-4team-backend
fi
sudo mkdir -vp /home/ec2-user/13th-4team-backend
