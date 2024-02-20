//LANDING PAGE
describe('App Component Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/#/') // Make sure this is the correct URL where your app is running
    })
  
    it('should get the basic page display', () => {
      cy.get('Header').should('contain', 'WeatherTogether');
      cy.get('Footer').should('contain', 'WeatherTogether');
      cy.get('.nav-container').should('contain', 'Login')
      cy.get('.nav-container').should('contain', 'Toggle Theme')
      cy.get('.nav-container').should('contain', 'New User');
      cy.get('h1').should('contain', 'WeatherTogether');
      cy.get('.landing-content').should('contain', 'Instructions for the game!!!!!!');
    });
  });