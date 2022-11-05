const Auth = require ( "aws-amplify" ).Auth;
import "cypress-localstorage-commands"; 
const username = Cypress. env("CYPRESS_TEST_USERNAME"); 
const password = Cypress. env("CYPRESS_TEST_PASSWORD"); 
const userPoolId = Cypress. env("COGNITO_USER_POOL_ID"); 
const clientId = Cypress. env ("COGNITO_CLIENT_APP_ID"); 
const awsconfig = { 
  aws_user_pools_id: userPoolId, 
  aws_user_pools_web_client_id: clientId, 
}; 
Auth. configure (awsconfig) ;

Cypress.Commands.add("signIn", () => {
    cy.session('testLogin', () => {
        cy.then(() => Auth.signIn(username, password)).then((cognitoUser) => {
          let { accessToken, idToken, refreshToken } = cognitoUser.signInUserSession
          cy.setCookie(`CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.LastAuthUser`, cognitoUser.username)
          cy.setCookie(`CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.${cognitoUser.username}.accessToken`, accessToken.jwtToken)
          cy.setCookie(`CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.${cognitoUser.username}.idToken`, idToken.jwtToken)
          // cy.setCookie(`CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.${cognitoUser.username}.refreshToken`, refreshToken)
        });
    })
  });