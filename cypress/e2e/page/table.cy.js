/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('DauTable', () => {
  beforeEach(() => {
    cy.visit('localhost:8080/table') // change this to the URL of your component
  })

  it('displays the table with data', () => {
    cy.get('.p-datatable').should('be.visible')
    cy.get('.p-datatable-tbody tr').should('have.length', 4)
  })

  it('sorts the table by month in descending order', () => {
    cy.get('.p-column-title').contains('Month').click()
    cy.get('.p-datatable-tbody tr:first-child td:first-child').contains('December') // assuming the current month is January
    cy.get('.p-column-title').contains('Month').click()
    cy.get('.p-datatable-tbody tr:first-child td:first-child').contains('January')
  })

  it('paginates the table', () => {
    cy.get('.p-paginator .p-paginator-pages').contains('1').should('have.class', 'p-highlight')
    // Waiting more data
    // cy.get('.p-paginator .p-paginator-pages').contains('2').click()
    // cy.get('.p-datatable-tbody tr:first-child td:first-child').contains('January')
    // cy.get('.p-paginator .p-paginator-pages').contains('2').should('have.class', 'p-highlight')
  })
})

