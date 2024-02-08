
//DASHBOARD COMPONENT
describe('Dashboard Component', () => {
    beforeEach(() => {
      cy.intercept("GET", `https://weather-together-be.onrender.com/api/v0/users/*/daily_stats`, {
        statusCode: 200,
        fixture: 'dailyGameStatsGet.json'
      }).as("getDailyStats");

      cy.intercept("GET", `https://weather-together-be.onrender.com/api/v0/users/*/competitive_stats`, {
        statusCode: 200,
        fixture: 'competitiveStatsGet.json'
      }).as("getCompetitiveStats");

      cy.logUserIn()
      cy.visit('http://localhost:3000/#/dashboard');
      
      cy.wait(['@getDailyStats', '@getCompetitiveStats']);
    });
  
    it('renders the dashboard interface with user statistics', () => {
        
        cy.get('.user-stats').should('contain', 'Total Games: 6');
        cy.get('.user-stats').should('contain', 'Avg. Score: 3');
        cy.get('.user-stats').should('contain', 'Best Score: 5');
        cy.get('.user-stats').should('contain', 'Date: 2024-02-05');
        cy.get('.user-stats').should('contain', 'Level 5: 0');
        cy.get('.user-stats').should('contain', 'Level 4: 0');
        cy.get('.user-stats').should('contain', 'Level 3: 0');
        cy.get('.user-stats').should('contain', 'Level 2: 0');
        cy.get('.user-stats').should('contain', 'Level 1: 0');
     
    });

    it('renders the dashboard interface with competitive statistics', () => {
       
        cy.get('.competitive-stats').should('contain', 'User Competitive Rank: 7');
        cy.get('.competitive-stats').should('contain', 'Competitive Game Count: 6');
        cy.get('.competitive-stats').should('contain', 'hello - 6.00');
        cy.get('.competitive-stats').should('contain', 'hello - 5.00');
        cy.get('.competitive-stats').should('contain', 'hello - 4.00');
        cy.get('.competitive-stats').should('contain', 'hello - 3.00');
        cy.get('.competitive-stats').should('contain', 'hello - 2.00');
        cy.get('.competitive-stats').should('contain', 'hello - 1.00');
       


});

it('renders the dashboard interface with and contains buttons and links', () => {
  
    cy.get('.link-box').should('contain', 'Competitive Game');
    cy.get('.link-box').should('contain', 'Private Game');
    cy.get('Header').should('contain', 'WeatherTogether');
    cy.get('Footer').should('contain', 'WeatherTogether');
    cy.get('nav a').should('contain', 'Dashboard')
    cy.get('nav a').should('contain', 'Profile')
    cy.get('button').should('contain', 'Logout')
   

})
})