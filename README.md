# MOSE Frontend 

![node version](https://img.shields.io/badge/node-16.17.x-brightgreen) ![license](https://img.shields.io/github/license/kundestyrt-norbit/mose-frontend)

The project is hosted by [AWS Amplify](https://aws.amazon.com/amplify/) and uses data from an Amazon Timestream database. The database contains data from NORBIT's [Bluetrack API](https://bluetrack.norbitiot.com/) (requries user to get access). The application does also use predictions stored in a AWS DynamoDB table, based on the sensors from Norbit and weather forecasts from met.no's [Location Forecast API](https://api.met.no/weatherapi/locationforecast/2.0/documentation). 

To get access to the application you need to log in. The users are stored in a [AWS Cognito User Pool](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html), connected to NORBIT's login system by SAML. The application does not support self signup.

## Dev
The project is using node version `16.17.x`, and NextJS version `12.3.x` which is a framework for ReactJS.

### Start

To start the frontend locally run `npm run dev`

### Testing and linting

To lint the project run `npm run lint` or run `npm run lint:fix` to fix all auto-fixable problems

### Env variables

All env variables must be exported via `next.config.js` to work in production. In addition the variables must be defined in `.env.local` for local development, and in the environment variables page in AWS Amplify console for production.
