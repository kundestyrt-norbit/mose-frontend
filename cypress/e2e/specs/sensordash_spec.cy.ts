const sensorButton = `[class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-1vxhsqp"]`
const sensorList = `[id=checkboxes-tags-demo]`
const sensorDashboardList = `[class="MuiTypography-root MuiTypography-h6 MuiDialogTitle-root css-1b2oqzi"]`

describe('Adds a sensor to and removes it from a dashboard', () => {
  beforeEach(() => {
    cy.signIn()
  })

  before(() => {
    cy.signIn()

    cy.visit('/dashboard')

    cy.contains('Select Dashboard').click()

    cy.get(`[id = "name"]`).type('Cypress Sensor Test')

    cy.contains('Add Dashboard').click()

    cy.contains('Cypress Sensor Test').should('exist')
  })

  after(() => {
    cy.clearCookies()
  })

  it('Adds sensor to the dashboard from list', () => {

    cy.visit('/list')

    cy.contains('Temperature').click()

    cy.contains('Temperature').invoke('text').then(label => {
      let sensorName = label
      console.log(sensorName)
      cy.wrap(sensorName).as('sensorName')
    })

    cy.get(sensorList).click()

    cy.contains('Cypress Sensor Test').click()

    cy.visit('/dashboard')

    cy.contains('Select Dashboard').click()

    cy.contains('Cypress Sensor Test').click()

    cy.get('@sensorName').then(sensorName => {
      cy.contains(sensorName).should('exist')
    })


  })

  it('Adds sensor to the dashboard from dashboard page', () => {

    cy.visit('/dashboard')

    cy.contains('Select Dashboard').click()

    cy.contains('Cypress Sensor Test').click()

    cy.get(sensorList).click()

    cy.get(`[role="option"]`).eq(1).click().invoke('text').then(label => {
      let sensorName = label
      cy.wrap(sensorName).as('sensorName')
    })

    cy.reload()

    cy.get('@sensorName').then(sensorName => {
      cy.contains(sensorName).should('exist')
    })

  })

  it('Removes sensor from list page', () => {
    cy.visit('/list')

    cy.contains('Temperature').click()

    cy.contains('Add to dashboard').invoke('text').then(label => {
      let sensorName = label
      cy.wrap(sensorName).as('sensorName')
    })

    cy.contains('Cypress Sensor Test').siblings().click()

    cy.visit('/dashboard')

    cy.contains('Select Dashboard').click()

    cy.contains('Cypress Sensor Test').click()

    cy.get('@sensorName').then(sensorName => {
      cy.contains(sensorName).should('not.exist')
    })
  })

  it('Removes sensor from dashboard page', () => {
    cy.visit('/dashboard')

    cy.contains('Select Dashboard').click()

    cy.contains('Cypress Sensor Test').click()

    cy.get(sensorList).click()

    cy.get(`[role="option"]`).eq(1).click().invoke('text').then(label => {
      let sensorName = label
      cy.wrap(sensorName).as('sensorName')
    })

    cy.reload()

    cy.get('@sensorName').then(sensorName => {
      cy.contains(sensorName).should('not.exist')
    })
  })

  it('Deletes the test dashboard', () => {
    cy.visit('/dashboard')

    cy.contains('Select Dashboard').click()

    cy.contains('Cypress Sensor Test').parent().parent().siblings().click()

    cy.contains('Cypress Sensor Test').should('not.exist')

    cy.visit('/list')
  })
})