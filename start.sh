#!/bin/bash
cd config/
HASH1=`md5sum config.js | cut -f1 -d ' '`
HASH2=`md5sum config.js | cut -f1 -d ' '`
counter=0

cd ..
if [ $counter != 1 ]
then
    DISPLAY=:0 & npm start &
    counter=1
    node PIR.js &
    cd webserver/
    npm start &
    node server.js &
    cd ..
fi

cd config/
while :;
do
    HASH2=`md5sum config.js | cut -f1 -d ' '`
    if [ "$HASH1" != "$HASH2" ]; then
        HASH1=`md5sum config.js | cut -f1 -d ' '`
        pkill -f PIR
        
        xscreensaver-command -display :0 -activate
        pkill electron
        npm run start &
        sleep 10s
        xscreensaver-command -display :0 -deactivate
        sleep 30s
        node ../PIR.js &
    fi
    sleep 10s
done
