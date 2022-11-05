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