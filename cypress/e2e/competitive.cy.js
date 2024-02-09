//COMPETITIVE GAME GET ON MOUNT
describe('CompetitiveGame Component', () => {
    beforeEach(() => {
      cy.intercept("GET", `https://weather-together-be.onrender.com/api/v0/rounds/current_competitive_round`, {
        statusCode: 200,
        fixture: 'competitiveGameGet.json'
      }).as("getCompetitiveGame");
  
      // After setting up the intercept, visit the page
      cy.logUserIn()
      cy.visit('http://localhost:3000/#/competitive');
      // Wait for the intercept to ensure it's applied before proceeding
      cy.wait('@getCompetitiveGame');
    });
  
    it('renders the game interface', () => {
      cy.get('.competitive-game').should('exist');
      cy.get('.map-container').should('exist');
      cy.get('.submit-button').should('exist');
      cy.get('.weather-data-container').should('contain','Today\'s Weather Challenge')
      cy.get('.weather-data-container').should('contain','Max Temp: 100 °F')
      cy.get('.weather-data-container').should('contain','Min Temp: 53.4 °F')
      cy.get('.weather-data-container').should('contain','Avg. Humidity: 88%')
      cy.get('.weather-data-container').should('contain','Total Precip: 0.24 in')
  
    });
  });
  
  
// COMPETITIVE GAME POST
describe('CompetitiveGame Component - POST Submission', () => {
    beforeEach(() => {
      // Mock GET request for initial game data
      cy.intercept('GET', `https://weather-together-be.onrender.com/api/v0/rounds/current_competitive_round`, {
        fixture: 'competitiveGameGet.json'
      }).as('competitiveGet');
  
      // Visit the CompetitiveGame page
      cy.logUserIn();
      cy.visit('http://localhost:3000/#/competitive');
  
      // Wait for the GET request to ensure the page is loaded
      cy.wait('@competitiveGet');
    });
  
    it('submits user-selected coordinates and validates the mock response', () => {
      // Intercept the POST request for submitting a guess
      cy.intercept('POST', `https://weather-together-be.onrender.com/api/v0/users/*/rounds/*/votes/new`, {
        fixture: 'competitiveGamePost.json'
      }).as('postGuess');
  
      // Simulate a user action 
      cy.get('.leaflet-container').click(300, 200); 
      cy.get('button.submit-button').click();
  
      // Wait for the POST and mock response
      cy.wait('@postGuess').then((interception) => {
        const attributes = interception.response.body.data.attributes;
        const { score, location_name, country } = attributes;
  
        // Conditionally check if the score is null and assert the expected UI behavior
        if (score === null) {
          cy.get('.ongoing-competition-message').should('contain', 'Guess submitted!! However, the competition is still ongoing. Check back later for your score!');
        } else {
          // If score is not null
          cy.get('.score-display').should('contain', score.toString());
          cy.get('.location-display').should('contain', location_name);
          cy.get('.country-display').should('contain', country);
        }
      });
    });
  });
  