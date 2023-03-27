describe('DauChart', () => {
    it('displays the chart', () => {
      cy.visit('localhost:8080/chart') // make sure to visit the correct page
  
      cy.get('.p-card-title').should('contain', 'Daily Active Users per Month Chart') // check the title
  
      cy.get('.apexcharts-canvas').should('exist') // check that the chart is displayed
  
      cy.get('.apexcharts-legend-text').should('have.length.gte', 1) // check that the legend items are displayed
    })
})