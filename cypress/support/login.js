let ele

before("", function () {
    cy.fixture('example').then(function (xyz) {
        ele = xyz
    })
})

Cypress.Commands.add("loginWithValidInputs", function () {
    cy.get(ele.username).should("be.visible").type("standard_user")
    cy.get(ele.password).type("secret_sauce")
    cy.get(ele.loginButton).click()
    cy.get(ele.title).should("have.text", "Products")
})

Cypress.Commands.add("emptyFields", function () {
    cy.get(ele.username).should("be.visible").clear()
    cy.get(ele.password).clear()
    cy.get(ele.loginButton).click()
    cy.get(ele.ErrorMessage).should("be.visible")
})

Cypress.Commands.add("invalidPassword", function () {
    cy.get(ele.username).should("be.visible").type("standard_user")
    cy.get(ele.password).type("admin10023")
    cy.get(ele.loginButton).click()
    cy.get(ele.ErrorMessage).should("be.visible")
})

Cypress.Commands.add("invalidUsername", function () {
    cy.get(ele.username).should("be.visible").type("Admooooin")
    cy.get(ele.password).type("secret_sauce")
    cy.get(ele.loginButton).click()
    cy.get(ele.ErrorMessage).should("be.visible")
})

Cypress.Commands.add("passwordisHidden", function () {
    cy.get(ele.password).type("secret_sauce")
    .should('have.attr', 'type', 'password') 
})