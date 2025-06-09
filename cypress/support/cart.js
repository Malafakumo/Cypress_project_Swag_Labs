let ele

before("", function () {
    cy.fixture('example').then(function (xyz) {
        ele = xyz
    })
})

Cypress.Commands.add("productDetails", function () {
    cy.loginWithValidInputs()
    cy.get(ele.productName).should("have.text", "Sauce Labs Bike Light")
    cy.get(ele.productDesc).contains("A red light isn't the desired state in testing")
    cy.get(ele.productPrice).should("have.text", "$9.99")
})

Cypress.Commands.add("addProductToCart", function () {
    cy.loginWithValidInputs()
    cy.get(ele.addToCart).click()
    cy.get(ele.removeFromCart).should("have.text", "Remove")
})

Cypress.Commands.add("removeProduct", function () {
    cy.loginWithValidInputs()
    cy.get(ele.addToCart).click()
    cy.get(ele.removeFromCart).should("have.text", "Remove").click()
    cy.get(ele.addToCart).should("be.visible")
})

Cypress.Commands.add("cartCounter", function () {
    cy.loginWithValidInputs()
    cy.get(ele.addToCart).click()
    cy.get(ele.cart).should("have.text", "1").click()
})

Cypress.Commands.add("cartProductDetails", function () {
    cy.cartCounter()
    cy.get(ele.cartProductName).should("have.text", "Sauce Labs Bike Light")
    cy.get(ele.cartProductDesc).contains("A red light isn't the desired state in testing")
    cy.get(ele.cartProductPrice).should("have.text", "$9.99")
})

Cypress.Commands.add("cartRemoveProduct", function () {
    cy.cartCounter()
    cy.get(ele.cartRemoveProduct).should("be.visible").click()
})

Cypress.Commands.add("continueShopping", function () {
    cy.cartCounter()
    cy.get(ele.continueShoppingbutton).should("be.visible").click()
})

Cypress.Commands.add("checkout", function () {
    cy.cartCounter()
    cy.get(ele.checkoutButton).should("be.visible").click()
    cy.get(ele.checkoutPage).should("be.visible")
})