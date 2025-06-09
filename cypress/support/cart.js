let selectors

before("", function () {
    cy.fixture('example').then(function (exampleData) {
        selectors = exampleData
    })
})

// Command: Verify product details on the product page
Cypress.Commands.add("productDetails", function () {
    cy.get(selectors.product.name).should("have.text", "Sauce Labs Bike Light")
    cy.get(selectors.product.desc).contains("A red light isn't the desired state in testing")
    cy.get(selectors.product.price).should("have.text", "$9.99")
})

// Command: Add product to cart and verify
Cypress.Commands.add("addProductToCart", function () {
    cy.get(selectors.cart.addToCartButtton).should("be.visible").click()
    cy.get(selectors.cart.removeButton).should("have.text", "Remove")
    cy.get(selectors.cart.link).click()
    cy.get(selectors.cart.productName).should("have.text", "Sauce Labs Bike Light")
    cy.get(selectors.cart.productDesc).contains("A red light isn't the desired state in testing")
    cy.get(selectors.cart.productPrice).should("have.text", "$9.99")
})

// Command: Remove product from cart and verify
Cypress.Commands.add("removeProduct", function () {
    cy.get(selectors.cart.link).click()
    cy.get(selectors.cart.removeProduct).should("be.visible").click()
    cy.get(selectors.cart.productName).should("not.exist")
})

// Command: Check cart counter after adding a product
Cypress.Commands.add("cartCounter", function () {
    cy.addProductToCart()
    cy.get(selectors.cart.link).should("be.visible")
    .and("have.text", "1")
})

// Command: Verify product details in the cart
Cypress.Commands.add("cartProductDetails", function () {
    cy.cartCounter()
    cy.get(selectors.cart.productName).should("have.text", "Sauce Labs Bike Light")
    cy.get(selectors.cart.productDesc).contains("A red light isn't the desired state in testing")
    cy.get(selectors.cart.productPrice).should("have.text", "$9.99")
})

// Command: Remove product from cart using cartRemoveProduct selector
Cypress.Commands.add("cartRemoveProduct", function () {
    cy.cartCounter()
    cy.get(selectors.cart.removeProduct).should("be.visible").click()
})

// Command: Continue shopping from the cart page
Cypress.Commands.add("continueShopping", function () {
    cy.cartCounter()
    cy.get(selectors.cart.continueShoppingButton).should("be.visible").click()
})

// Command: Proceed to checkout from the cart page
Cypress.Commands.add("checkout", function () {
    cy.cartCounter()
    cy.get(selectors.checkout.button).should("be.visible").click()
    cy.get(selectors.checkout.page).should("be.visible")
})