#!/bin/bash
curl -s -A 'smartmirrorrsppi@gmail.com' -X GET --header 'Accept: application/json' 'https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat=58.4010&lon=24.4974' | json_pp > weatherdata.json