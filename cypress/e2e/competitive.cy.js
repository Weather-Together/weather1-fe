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
  
      // Visit the DailyGame page
      cy.logUserIn()
      cy.visit('http://localhost:3000/#/competitive');
  
      // Wait for the GET request to ensure the page is loaded
      cy.wait('@competitiveGet');
    });
  
    it('submits user-selected coordinates and validates the mock response', () => {
      // Intercept the POST request for submitting a guess
      cy.intercept('POST', `https://weather-together-be.onrender.com/api/v0/users/*/rounds/*/votes/new`, {
        fixture: 'competitiveGamePost.json'
      }).as('postGuess');
  
      // Simulate a user 
      cy.get('.leaflet-container').click(300, 200); 
  
      // trigger the actual game guess submission
      cy.get('button.submit-button').click();
  
      // Wait for the POST request to be intercepted and validate the mock response
      cy.wait('@postGuess').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.data.attributes).to.deep.equal({
            "lat": "46.8",
            "lon": "10.3",
            "weather_stats": null,
            "score": null,
            "status": "unprocessed",
            "round_id": 92,
            "user_id": 221,
            "username": "OutstandingMammoth",
            "location_name": null,
            "region": null,
            "country": null,
            "maxtemp_f": null,
            "mintemp_f": null,
            "avgtemp_f": null,
            "maxwind_mph": null,
            "totalprecip_in": null,
            "avghumidity": null,
            "daily_chance_of_rain": null,
            "daily_chance_of_snow": null
        });
  
        // Verify UI changes based on the response
        cy.get('.score-display').should('contain', '6');
        cy.get('.score-display').should('contain', 'Ialibu');
        cy.get('.score-display').should('contain', 'null');
        cy.get('.score-display').should('contain', 'Papua New Guinea');
        cy.get('.score-display').should('contain', 'null');
        
      });
    });
  });
  