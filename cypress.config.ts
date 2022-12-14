import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://127.0.0.1:3000',
    experimentalSessionAndOrigin: true,
    excludeSpecPattern: ['cypress/e2e/runall_spec.cy.ts'],
    video: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 12000,
  },
})
