# MiniCloud
A complete replacement for AWS. (not really)

## Purpose
Just a tiny expirement to deploy small functions and execute them out in cloud-land. Node makes it pretty easy.

## Usage

### Run the "Cloud"
(it's an express app). Just `npm i` and `npm start`.

### Using it

GET `/functions/ls`: Returns a list of available functions.

PUT `/functions/{name}`: Adds a new function. Overwrites the previous function.

POST `/functions/invoke/{name}`: Invokes a function. Returns the results.

### Examples

Some sample scripts in the package.json file have been created and work for windows. They use CURL to upload files.

`npm run upload-hello` then `npm run invoke-hello`.

`npm run upload-add` then `npm run invoke-add`.

Example response:

```bash
λ npm run invoke-add

> minicloud@1.0.0 invoke-add C:\projects\miniCloud
> curl -i -d "{ \"a\":2, \"b\":2 }" -H "Content-Type: application/json" -X POST localhost:3000/functions/invoke/add.js

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 1
ETag: W/"1-G2RTiSRzpGfQc3LUXrBavCAxZHo"
Date: Thu, 07 May 2020 03:29:33 GMT
Connection: keep-alive

4
```