// Import selectors from the example fixture for use in login-related commands
let selectors

// Load fixture data before running any tests in this file
before("", function () {
    cy.fixture('example').then(function (exampleData) {
        selectors = exampleData
    })
})

/**
 * Command: Log in with provided credentials
 * @param {standard_user} username
 * @param {strsecret_sauceing} password
 */
// This command allows you to log in by providing a username and password.
Cypress.Commands.add("login", (username, password) => {
    cy.get(selectors.username).should("be.visible").clear().type(username)
    cy.get(selectors.password).clear().type(password)
    cy.get(selectors.loginButton).click()
})

// Command: Log in with valid credentials and verify successful login
Cypress.Commands.add("loginWithValidInputs", function () {
    cy.login("standard_user", "secret_sauce")
    cy.get(selectors.pageTitle).should("have.text", "Products")
})

// Command: Attempt login with empty fields and verify error message
Cypress.Commands.add("emptyFields", function () {
    cy.get(selectors.username).should("be.visible").clear()
    cy.get(selectors.password).clear()
    cy.get(selectors.loginButton).click()
    cy.get(selectors.errorMessage).should("be.visible")
})

// Command: Attempt login with invalid password and verify error message
Cypress.Commands.add("invalidPassword", function () {
    cy.login("standard_user", "admin10023")
    cy.get(selectors.errorMessage).should("be.visible")
})

// Command: Attempt login with invalid username and verify error message
Cypress.Commands.add("invalidUsername", function () {
    cy.login("Admooooin", "secret_sauce")
    cy.get(selectors.errorMessage).should("be.visible")
})

// Command: Verify that the password field is hidden by default
Cypress.Commands.add("passwordisHidden", function () {
    cy.get(selectors.password).type("secret_sauce")
    .should('have.attr', 'type', 'password') 
})

// Command: Attempt login with locked out user and verify error message
Cypress.Commands.add("lockedOutUser", function () {
    cy.login("locked_out_user", "secret_sauce")
    cy.get(selectors.errorMessage)
      .should("be.visible")
      .and("have.text", "Epic sadface: Sorry, this user has been locked out.")
})