Cypress.session.clearAllSavedSessions()
// describe('Log in and out', () => {
//   beforeEach(() => {
//     cy.signIn()
//   })

//   after(() => {
//     Cypress.session.clearAllSavedSessions()
//     cy.clearCookies()
//   })

//   it('Logs in and out of the site', () => {
//     cy.visit('/')

//     cy.contains('R').click()
//     cy.contains('Logout').click()
//   })
// })

// describe('Navigate pages', () => {
//   beforeEach(() => {
//     cy.signIn()
//   })

//   after(() => {
//     cy.clearCookies()
//   })
  
//   it('Visits the dashboard page', () => {
//     cy.visit('/')

//     cy.contains('Dashboard').click()
//     cy.url().should('include', '/dashboard')

//     cy.intercept('/api/dashboard/list', {})
//   })

//   it('Visits the map page', () => {
//     cy.visit('/')

//     cy.contains('Map').click()
//     cy.url().should('include', '/map')
//   })

//   it('Visits the list page', () => {
//     cy.visit('/')

//     cy.contains('List').click()
//     cy.url().should('include', '/list')
//   })
// })

// describe('Creates dashboard and deletes it', () => {
//   beforeEach(() => {
//     cy.signIn()
//   })

//   after(() => {
//     cy.clearCookies()
//   })

//   it('Creates a new dashboard', () => {

//     cy.visit('/dashboard')

//     cy.contains('Select Dashboard').click()

//     cy.get(`[id = "name"]`).type('Cypress Test Dashboard')

//     cy.contains('Add Dashboard').click()

//     cy.contains('Cypress Test Dashboard').click()

//     cy.url().should('include', 'dashboard/')

//   })

//   it('Deletes a dashboard', () => {
//     cy.visit('/dashboard')

//     cy.contains('Select Dashboard').click()

//     cy.contains('Cypress Test Dashboard').parent().parent().siblings().click()

//     cy.contains('Cypress Test Dashboard').should('not.exist')
//   })
// })
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

    cy.get(sensorButton).eq(0).click()
    
    cy.get(sensorDashboardList).invoke('text').then(label => {
      let sensorName = label
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
    
    cy.get(sensorButton).eq(0).click()
    
    cy.get(sensorDashboardList).invoke('text').then(label => {
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