describe('Creates dashboard and deletes it', () => {
  beforeEach(() => {
    cy.signIn()
  })

  after(() => {
    cy.clearCookies()
  })

  it('Creates a new dashboard', () => {

    cy.visit('/dashboard')

    cy.contains('Select Dashboard').click()

    cy.get(`[id = "name"]`).type('Cypress Test Dashboard')

    cy.contains('Add Dashboard').click()

    cy.contains('Cypress Test Dashboard').click()

    cy.url().should('include', 'dashboard/')

  })

  it('Deletes a dashboard', () => {
    cy.visit('/dashboard')

    cy.contains('Select Dashboard').click()

    cy.contains('Cypress Test Dashboard').parent().parent().siblings().click()

    cy.contains('Cypress Test Dashboard').should('not.exist')
  })
})