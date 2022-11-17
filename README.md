# MOSE Frontend 

![node version](https://img.shields.io/badge/node-16.17.x-brightgreen) ![license](https://img.shields.io/github/license/kundestyrt-norbit/mose-frontend)

The project is hosted by [AWS Amplify](https://aws.amazon.com/amplify/) and uses data from an Amazon Timestream database. The database contains data from NORBIT's [Bluetrack API](https://bluetrack.norbitiot.com/) (requries user to get access). The application does also use predictions stored in a AWS DynamoDB table, based on the sensors from Norbit and weather forecasts from met.no's [Location Forecast API](https://api.met.no/weatherapi/locationforecast/2.0/documentation). 

To get access to the application you need to log in. The users are stored in a [AWS Cognito User Pool](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html), connected to NORBIT's login system by SAML. The application does not support self signup.

## Dev
The project is using node version `16.17.x`, and Next.js version `12.3.x` which is a framework for React.

### Prerequisites
- Node.js version `16.17.x`. Can be downloaded from [here](https://nodejs.org/en/download/)

### Installation
1. Run `npm install`
2. Run `npm install -g @aws-amplify/cli`
3. Run ` amplify pull --appId <appId> --envName dev`, where `<appId>` can be gotten from the APP ARN `arn:aws:amplify:eu-north-1:<awsUserId>:apps/<appId` found in the [Amplify console](https://console.aws.amazon.com/amplify/home?). You need to be logged in to the AWS Console to be able to access the Amplify Console. Fill in the correct access keys when asked.

### Local development

To start the frontend locally run `npm run dev`

### Testing and linting
#### Linting

To lint the project run `npm run lint` or run `npm run lint:fix` to fix all auto-fixable problems

#### Cypress testing
To run the cypress test, the app must be running. Run `npm run build` followed by `npm run start`, to compile and start the app. Cypress tests can then be run with the command `npm run cy:run` or `npm run cy:open` to open Cypress in the browser. Environment variables will need to be set to be able to run the tests.
### Env variables

All env variables must be exported via `next.config.js` to work in production. In addition the variables must be defined in `.env.local` for local development, and in the environment variables page in AWS Amplify console for production. Env variables can be found in the AWS Secrets Manager in Stockholm (eu-north-1) under `prod/mose`. To update any environment variables in production, please follow the guide [here](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html).
