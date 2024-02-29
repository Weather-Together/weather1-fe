
//DASHBOARD COMPONENT
describe('Dashboard Component', () => {
    beforeEach(() => {
      cy.intercept("GET", `https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/*/daily_stats`, {
        statusCode: 200,
        fixture: 'dailyGameStatsGet.json'
      }).as("getDailyStats");

      cy.intercept("GET", `https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/*/competitive_stats`, {
        statusCode: 200,
        fixture: 'competitiveStatsGet.json'
      }).as("getCompetitiveStats");

      cy.intercept("GET", `https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/*/games`, {
        statusCode: 200,
        fixture: 'customGamesGet.json'
      }).as("getCustomGames");

      cy.logUserIn()
      cy.visit('http://localhost:3000/#/dashboard');
      
      cy.wait(['@getDailyStats', '@getCompetitiveStats', '@getCustomGames']);
    });
  
    it('renders the dashboard interface with user statistics', () => {  
        cy.get('.user-stats').should('contain', 'Games Played: 6');
        cy.get('.user-stats').should('contain', 'Avg. Score: 3');
        cy.get('.user-stats').should('contain', 'Best Score: 5 on 2024-02-05');
    });

    it('renders the dashboard interface with competitive statistics', () => {
       
        cy.get('.competitive-stats').should('contain', 'User Competitive Rank: 7');
        cy.get('.competitive-stats').should('contain', 'Competitive Game Count: 6');
        cy.get('.competitive-stats').should('contain', 'hello - 6');
        cy.get('.competitive-stats').should('contain', 'hello - 5');
        cy.get('.competitive-stats').should('contain', 'hello - 4');
        cy.get('.competitive-stats').should('contain', 'hello - 3');
        cy.get('.competitive-stats').should('contain', 'hello - 2');
        cy.get('.competitive-stats').should('contain', 'hello - 1');
       
});

it('renders the dashboard interface with and contains buttons and links', () => {
  
    cy.get('.link-box').should('contain', 'Competitive Game');
    cy.get('.link-box').should('contain', 'Private Game');
    cy.get('Header').should('contain', 'WeatherTogether');
    cy.get('Footer').should('contain', 'WeatherTogether');
    cy.get('.nav-container').should('contain', 'Dashboard')
    cy.get('.nav-container').should('contain', 'Profile')
    cy.get('.nav-container').should('contain', 'Toggle Theme')
    cy.get('button').should('contain', 'Logout')
   
})

it('renders the dashboard interface with and custom games', () => {
  
    cy.get('.custom-games').should('contain', 'Custom Games');
    cy.get('.game-list').should('contain', 'Tornado');
  
})
})