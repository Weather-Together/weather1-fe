//LANDING PAGE
describe('App Component Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/weather1-fe') // Make sure this is the correct URL where your app is running
  });

  it('should get the basic page display', () => {
    cy.get('Header').should('contain', 'WeatherTogether');
    cy.get('Footer').should('contain', 'WeatherTogether');
    cy.get('nav a').should('contain', 'Login')
    cy.get('nav a').should('contain', 'New User');
    cy.get('h1').should('contain', 'WeatherTogether');
    cy.get('.landing-content').should('contain', 'Instructions for the game!!!!!!');
  });
});




//DAILY GAME GET ON MOUNT
describe('DailyGame Component', () => {
  beforeEach(() => {
    cy.intercept("GET", `https://weather-together-be.onrender.com/api/v0/users/*/rounds/current_daily_round`, {
      statusCode: 200,
      fixture: 'dailyGameGet.json'
    }).as("getDailyGame");

    // After setting up the intercept, visit the page
    cy.visit('http://localhost:3000/weather1-fe/daily-game');

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




  // Additional tests...

  // it('allows a location to be submitted', () => {
  //   // may need to rework
  //   cy.get('.map-container').click();

  //   // Assuming clicking the map automatically selects a location
  //   // Now, try submitting
  //   cy.get('.submit-button').click();

  //   cy.get('.score-display').should('exist');
  //   cy.get('.score-display p').should('contain', 'Your score:1082');
  // });

