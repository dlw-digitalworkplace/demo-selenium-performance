## Installation

npm install -g sitespeed.io

## Start sitespeed.io

sitespeed.io.cmd https://<TENANT>.sharepoint.com --preScript ./login.js
sitespeed.io.cmd https://<TENANT>.sharepoint.com --preScript ./login-manual.js
sitespeed.io.cmd https://<TENANT>.sharepoint.com --preScript ./login.js -n 1 --plugins.add .\plugin.js > output.txt
