describe('App Component Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/weather1-fe') // Make sure this is the correct URL where your app is running
  });

  it('passes', () => {
   
  });

  it('should get the header', () => {
    cy.get('h1').should('contain', 'WeatherTogether');
  });
});


describe('DailyGame Component', () => {
  beforeEach(() => {
    // Assuming you have set up your app to run on localhost:3000
    // Adjust the URL as necessary for your development environment
    cy.visit('http://localhost:3000/weather1-fe/daily-game');
  });

  it('renders the game interface', () => {
    cy.get('.daily-game').should('exist');
    cy.get('.map-container').should('exist');
    cy.get('.submit-button').should('exist');
  });

  it('allows a location to be submitted', () => {
    // may need to rework
    cy.get('.map-container').click();

    // Assuming clicking the map automatically selects a location
    // Now, try submitting
    cy.get('.submit-button').click();

    cy.get('.score-display').should('exist');
    cy.get('.score-display p').should('contain', 'Your score:1082');
  });

});
