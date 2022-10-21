# MOSE Frontend 

![node version](https://img.shields.io/badge/node-16.17.x-brightgreen) ![license](https://img.shields.io/github/license/kundestyrt-norbit/mose-frontend)

## Dev
The project is using node version `16.17.x`

### Start

To start the frontend locally run `npm run start`

### Testing and linting

To lint the project run `npm run lint` or run `npm run lint:fix` to fix all auto-fixable problems

### Env variables

All env variables must be imported in `next.config.js` to work in production. In addition the variables must be defined in `.env.local` for local development, and in the environment variables page in AWS Amplify console for production.
