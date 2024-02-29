
 //ERROR MESSAGE

//  it('should show error messaging to a user', () => {
//   cy.intercept('GET', 'http://localhost:3000', { forceNetworkError: true }).as('error');
//   cy.visit('http://localhost:3000');//visit the actual site
//   cy.wait('@error');
//   cy.get('h2').should('contain.text', 'Something happened with loading the page.');
// });


//DAILY GAME GET ON MOUNT
describe('DailyGame Component', () => {
  beforeEach(() => {
    cy.intercept("GET", `https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/*/rounds/current_daily_round`, {
      statusCode: 200,
      fixture: 'dailyGameGet.json'
    }).as("getDailyGame");

    // After setting up the intercept, visit the page
    cy.logUserIn()
    cy.visit('http://localhost:3000/#/daily-game');
    // Wait for the intercept to ensure it's applied before proceeding
    cy.wait('@getDailyGame');
  });

  it('renders the game interface', () => {
    cy.get('.daily-game').should('exist');
    cy.get('.map-container').should('exist');
    cy.get('.submit-button').should('exist');
    cy.get('.weather-data-container').should('contain','Today\'s Weather Challenge')
    cy.get('.weather-data-container').should('contain','Max Temp: 100 °F')
    cy.get('.weather-data-container').should('contain','Min Temp: 53.4 °F')
    cy.get('.weather-data-container').should('contain','Avg. Humidity: 88%')
    cy.get('.weather-data-container').should('contain','Total Precip: 0.24 in')

  });
});


// DAILY GAME POST
describe('DailyGame Component - POST Submission', () => {
  beforeEach(() => {
    // Mock GET request for initial game data
    cy.intercept('GET', `https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/*/rounds/current_daily_round`, {
      fixture: 'dailyGameGet.json'
    }).as('dailyGet');

    // Visit the DailyGame page
    cy.logUserIn()
    cy.visit('http://localhost:3000/#/daily-game');

    // Wait for the GET request to ensure the page is loaded
    cy.wait('@dailyGet');
  });

  it('submits user-selected coordinates and validates the mock response', () => {
    // Intercept the POST request for submitting a guess
    cy.intercept('POST', `https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/*/rounds/current_daily_round/vote`, {
      fixture: 'dailyGamePost.json'
    }).as('postGuess');

    // Simulate a user 
    cy.get('.leaflet-container').click(300, 200); 

    // trigger the actual game guess submission
    cy.get('button.submit-button').click();

    // Wait for the POST request to be intercepted and validate the mock response
    cy.wait('@postGuess').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.data.attributes).to.deep.equal({
        lat: "-15.74",
        lon: "-54.34",
        score: 2222.78,
        status: "processed",
        round_id: 1,
        user_id: 1,
        username: "username1",
        location_name: "My House",
        region: "Mato Grosso",
        country: "Brazil",
        maxtemp_f: 92.5,
        mintemp_f: 68.8,
        avgtemp_f: null,
        maxwind_mph: 13.6,
        totalprecip_in: 0.5,
        avghumidity: 78,
        daily_chance_of_rain: 100,
        daily_chance_of_snow: 0,
      });

      // Verify UI changes based on the response
      cy.get('.score-display').should('contain', '2222.78');
      cy.get('.score-display').should('contain', 'Ialibu');
      cy.get('.score-display').should('contain', 'Papua New Guinea');
      
    });
  });
});

