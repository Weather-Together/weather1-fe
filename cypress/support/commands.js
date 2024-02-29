// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('mockLoginSuccess', () => {
  cy.intercept("POST", "https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/login",{
  statusCode: 201,
  header: { 'Content-type': 'application/json', 'ACCEPT': 'application/json'},
  body: {
    data: {email: 'user1@gmail.com',
    password: 'password1'
  }}
  })
})

Cypress.Commands.add('mockUserCreationSuccess', () => {
  cy.intercept("POST", "https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/", {
    statusCode:201,
    header: { 'Content-type': 'application/json', 'ACCEPT': 'application/json'},
    body: {
      data: {email: 'Brendan@gmail.com',
      username: 'Brendan',
      password: 'password',
      confirm_confirmation: 'password'
    }}
  })
})

Cypress.Commands.add('mockLoginFail', () => {
  cy.intercept("POST", "https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/login",{
    statusCode: 401,
    body: {errors:[{detail:'Invalid Username or Password'}]}
  })
})

Cypress.Commands.add('mockLoginEmailFail', () => {
  cy.intercept("POST", "https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/login",{
    statusCode: 401,
    body: {errors:[{detail:'User must verify email'}]}
  })
})

Cypress.Commands.add('logUserIn', () => {
  window.localStorage.setItem('User', JSON.stringify({
    data:{
       email: 'user1@gmail.com',
       username: "estim8tedpropht",
       id: 460}
    }))
})


// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// cypress/support/commands.js
// import './cypress-setup';

  


// cypress/commands/customCommands.js



  Cypress.Commands.add("setCypressEnv", (envVariables) => {
    Cypress.env(envVariables);
  });
  
  Cypress.Commands.add("declareCypressEnv", () => {
    // Add your Cypress environment variables here
    // For example:
    Cypress.setCypressEnv({
      showFormDuringTesting: true,
      anotherVariable: "someValue",
    });
  });
  


  //FOR THE DASHBOARD LOGIN
  Cypress.Commands.add('login', (username, password) => {
    // Implement your login logic here
    cy.visit('http://localhost:3000/weather1-fe/#/login');
    cy.get('#username').type(username);
    cy.get('#passwordInput').type(password);
    cy.get('form').submit();
  });
  
  Cypress.Commands.add('visitDashboard', () => {
    // Implement logic to visit the dashboard page
    cy.visit('http://localhost:3000/weather1-fe/#/dashboard');
  });
  