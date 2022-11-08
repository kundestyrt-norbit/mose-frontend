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
    cy.visit('/')

    cy.contains('Map').click()
    cy.url().should('include', '/map')
  })

  it('Visits the list page', () => {
    cy.visit('/')

    cy.contains('List').click()
    cy.url().should('include', '/list')
  })
})