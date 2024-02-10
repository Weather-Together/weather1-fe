describe('Should display new user page with Nav and input fields', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/#/new-user')
    })

    it('Should display a navBar', () => {
        cy.get('header').should('be.visible')
          .get('header').should('contain', 'WeatherTogether')
          .get('header').should('contain', 'Login')
          .get('header').should('contain', 'New User')
    })

    it('Should should display newUser fixture', () => {
        cy.get('.newuser-form').should('be.visible')
          .get('.newuser-form').should('contain', 'E-mail:')
          .get('.newuser-form').should('contain', 'Username: ')
          .get('.newuser-form').should('contain', 'Password:')
          .get('.newuser-form').should('contain', 'Confirm Password')
          .get('.newuser-form').should('contain', 'Create Account')
        cy.get('img').should('be.visible')
          .get('img').should('have.attr', 'src', '/weather1-fe/static/media/logo_480.67f44ac75dde7b7a1a89.png')
        cy.get('.email').should('contain', '')
        cy.get('.username').should('contain', '')
        cy.get('.password').should('contain', '')
        cy.get('.confirm-password').should('contain', '')
    })
})

describe('Should allow New User creation with checks', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/#/new-user')
    })

    it('Should allow for User creation and route to Login', () => {
        cy.get('.email').type('Brendan@gmail.com')
          .get('.email').should('have.value', 'Brendan@gmail.com')
        cy.get('.username').type('Brendan')
          .get('.username').should('have.value', 'Brendan')
        cy.get('.password').type('password')
          .get('.password').should('have.value', 'password')
        cy.get('.confirm-password').type('password')
          .get('.confirm-password').should('have.value', 'password')
        cy.mockUserCreationSuccess()
        cy.get('.create-account').click()
        cy.url().should('include', '/login')
    })

    it('Should fail creation if email format is incorrect', () => {
        cy.get('.email').type('testemail')
          .get('.email').should('have.value', 'testemail')
        cy.get('.create-account').click()
        cy.get('.email-error').should('contain', 'Invalid Email')
    })

    it('Should fail creation if username is less than 5 characters', () => {
        cy.get('.email').type('brendan@gmail.com')
        cy.get('.username').type('four')
        cy.get('.create-account').click()
        cy.get('.username-error').should('contain', 'Username must be 5 or more characters')
    })

    it('Should fail creation if passwords do not match', () => {
        cy.get('.email').type('brendan@gmail.com')
        cy.get('.username').type('fives')
        cy.get('.password').type('pass')
        cy.get('.confirm-password').type('word')
        cy.get('.create-account').click()
        cy.get('.password-error').should('contain', `Passwords don't match`)
    })

})
