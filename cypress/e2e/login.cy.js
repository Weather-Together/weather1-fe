describe('Should display Login page with Nav and input fields', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/#/login')
    })

    it('Should display the Header/Navbar on Login page', () => {
        cy.get('header').should('be.visible')
          .get('header').should('contain', 'WeatherTogether')
          .get('header').should('contain', 'New User')
          .get('header').should('contain', 'Login')
    })

    it('Should display login fixture', () => {
        cy.get('.login-form').should('contain', 'Email Address:')
          .get('.login-form').should('contain', 'Password:')
          .get('.login-form').should('contain', 'Login')
          .get('.login-form').should('contain', 'Show Password')
        cy.get('img').should('be.visible')
        cy.get('img').should('have.attr', 'src', '/weather1-fe/static/media/logo_480.67f44ac75dde7b7a1a89.png')
    })
    
    it('should be able to input values', () => {
        cy.get('.email').type('TestUser')
        cy.get('.email').should('have.value', 'TestUser')
        cy.get('.password').type('TestPass')
        cy.get('.password').should('have.value', 'TestPass')
        cy.get('.password').should('have.attr', 'type', 'password')
    })

    it('should be able to show password', () => {
        cy.get('.password').type('TestPass')
          .get('.password').should('have.value', 'TestPass')
          .get('.password').should('have.attr', 'type', 'password')
        cy.get('.show-pass').should('exist').click()
        cy.get('.password').should('have.attr', 'type', 'text')
        cy.get('.show-pass').click()
    })

    it('should login a user', () => {
        cy.mockLoginSuccess();
        cy.get('.email').type('user1@gmail.com')
        cy.get('.password').type('password1')
        cy.get('.login-button').click()
        cy.url().should('include', 'http://localhost:3000/#/daily-game')
    })
    //Need to add checking a user data is stored

    it('should update DOM if login fails due to incorrect info', () => {
        cy.mockLoginFail()
        cy.get('.email').type('fakeUser')
        cy.get('.password').type('password1')
        cy.get('.login-button').click()
        cy.get('.password').should('have.value', '')
        cy.get('.login-fail').should('be.visible')
          .get('.login-fail').should('contain', 'Invalid Username or Password')
    })

    it('should update DOM if login fails due to email verification', () => {
        cy.mockLoginEmailFail()
        cy.get('.email').type('user6@gmail.com')
        cy.get('.password').type('password6')
        cy.get('.login-button').click()
        cy.get('.password').should('have.value', '')
        cy.get('.login-fail').should('be.visible')
          .get('.login-fail').should('contain', 'User must verify email')
    })

    it('should have a footer', () => {
        cy.get('footer').should('contain', 'WeatherTogether')
    })
})