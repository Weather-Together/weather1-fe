describe('App Component Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000') // Make sure this is the correct URL where your app is running
  });

  it('passes', () => {
   
  });

  it('should get the header', () => {
    cy.get('h1').should('contain', 'Header');
  });
});
