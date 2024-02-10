// // CREATE PRIVATE GAME
// describe('CreatePrivateGame Component', () => {
//   beforeEach(() => {
    
//     // Visit the CreatePrivateGame page
//     cy.logUserIn();
//    // Wait for 5 seconds before visiting the URL

//     cy.visit('http://localhost:3000/#/new-private-game');

//     // Wait for the GET request to ensure the page is loaded
//     // cy.wait('createPrivateGame');
//   });

//   it('renders the create game interface', () => {
//     cy.get('button.create-game-button').should('exist');
//     cy.get('input.game-name-input').should('exist');
//     cy.get('input.game-duration-input').should('exist');
//   });

//   it('creates a private game and validates the mock response', () => {
//     // Intercept the POST request for creating a private game
//     cy.intercept('POST', `https://weather-together-be.onrender.com/api/v0/users/*/games/new`, {
//       fixture: 'createPrivateGamePost.json'
//     }).as('createPrivateGame');

//     // Simulate a user action
//     cy.get('input.game-name-input').type('My Private Game');
//     cy.get('input.game-password-input').type('password');
//     cy.get('input.game-duration-input').type('60');
//     cy.get('button.create-game-button').click();

//     // Wait for the POST and mock response
//     cy.wait('@createPrivateGame').then((interception) => {
//       const attributes = interception.response.body.data.attributes;
//       const { game_id, game_name, game_password, game_duration } = attributes;

//       // Assert the expected UI behavior
//       cy.get('.game-id-display').should('contain', game_id.toString());
//       cy.get('.game-name-display').should('contain', game_name);
//       cy.get('.game-password-display').should('contain', game_password);
//       cy.get('.game-duration-display').should('contain', game_duration.toString());
//     });
//   });
// });