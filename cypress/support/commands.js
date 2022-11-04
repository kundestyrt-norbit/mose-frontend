// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const Auth = require ( "aws-amplify" ).Auth;
import "cypress-localstorage-commands"; 
const username = Cypress. env("username"); 
const password = Cypress. env("password"); 
const userPoolId = Cypress. env("userPoolId"); 
const clientId = Cypress. env ("clientId"); 
const awsconfig = { 
  aws_user_pools_id: userPoolId, 
  aws_user_pools_web_client_id: clientId, 
}; 
Auth. configure (awsconfig) ;

Cypress.Commands.add("signIn", () => {
    cy.session('testLogin', () => {
        cy.then(() => Auth.signIn(username, password)).then((cognitoUser) => {
            let { username, LastAuthUser } = cognitoUser
            cy.setCookie(`CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.${cognitoUser.LastAuthUser}.${name}`, cognitoUser.LastAuthUser)
            cy.setCookie(`CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.${username.accessToken}.${name}`, username.accessToken)
            cy.setCookie(`CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.${username.idToken}.${name}`, username.idToken)
            cy.setCookie(`CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.${username.refreshToken}.${name}`, username.refreshToken)
        });
    })
  });