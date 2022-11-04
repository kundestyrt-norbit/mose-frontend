Cypress.session.clearAllSavedSessions()
describe('Log in and out', () => {
  beforeEach(() => {
    cy.signIn()
  })

  after(() => {
    Cypress.session.clearAllSavedSessions()
    cy.clearCookies()
  })

  it('Logs in and out of the site', () => {
    cy.visit('/')

    cy.contains('R').click()
    cy.contains('Logout').click()
  })
})

describe('Navigate pages', () => {
  beforeEach(() => {
    cy.signIn()
  })

  after(() => {
    cy.clearCookies()
  })
  
  it('Visits the dashboard page', () => {
    cy.visit('/')

    cy.contains('Dashboard').click()
    cy.url().should('include', '/dashboard')

    cy.intercept('/api/dashboard/list', {})
  })

  it('Visits the map page', () => {
    cy.visit('/map')

    cy.url().should('include', '/map')
  })

  it('Visits the list page', () => {
    cy.visit('/list')

    cy.url().should('include', '/list')
  })
})

describe('Add sensor to dashboard', () => {
  beforeEach(() => {
    cy.signIn()
  })

  after(() => {
    cy.clearCookies()
  })

  it('Creates a new dashboard', () => {
    // cy.intercept({
    //   method: 'GET',
    //   url: '/api/dashboard/list',
    // }).as('dataGetFirst')

    cy.visit('/dashboard')

    cy.contains('Select Dashboard').click()

    // cy.wait('@dataGetFirst').its('response.statusCode').should('equal', 200)
    cy.contains('Add Dashboard').click()
  })
})