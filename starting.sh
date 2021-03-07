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
    echo $counter
fi

cd config/
while :;
do
    HASH2=`md5sum config.js | cut -f1 -d ' '`
    if [ "$HASH1" = "$HASH2" ]; then
        echo "Files have the same content"
    else
        echo "Files have NOT the same content"
        HASH2=HASH1
        pkill electron
        npm run start &
    fi
    sleep 10s
    echo $HASH1
    echo $HASH2
done
