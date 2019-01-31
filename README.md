# DirtyCode

Small programming sandbox. User's code runs in docker containers on backend.

## How to install locally

1. Run `prepare.sh`. It will build required docker images.
2. Run `npm i` to install back-end deps.
3. Run `npm i && npm start` in `client/` directory to install front-end deps and build front-end.
4. Run `npm start` in root dir to serve the front-end and start a server.
