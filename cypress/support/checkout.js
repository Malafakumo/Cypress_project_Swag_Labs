import { faker } from '@faker-js/faker';

let ele

before("", function () {
    cy.fixture('example').then(function (xyz) {
        ele = xyz
    })
})

Cypress.Commands.add("successfulCheckout", function () {
    cy.checkout()
    cy.get(ele.firstName).type(faker.person.firstName())
    cy.get(ele.lastName).type(faker.person.lastName())
    cy.get(ele.zipCode).type(faker.location.zipCode())
    cy.get(ele.continueButton).click()
    cy.get(ele.finishButton).should("be.visible").click()
    cy.get(ele.completeCheckout).should("have.text", "Thank you for your order!")
})

Cypress.Commands.add("checkoutOverview", function () {
    cy.checkout()
    cy.get(ele.firstName).type(faker.person.firstName())
    cy.get(ele.lastName).type(faker.person.lastName())
    cy.get(ele.zipCode).type(faker.location.zipCode())
    cy.get(ele.continueButton).click()
    cy.get(ele.paymentInfo).should("have.text", "SauceCard #31337")
    cy.get(ele.shippingInfo).should("have.text", "Free Pony Express Delivery!")
    cy.get(ele.totalPrice).contains( "$10.79")
})

Cypress.Commands.add("cancelCheckout", function () {
    cy.checkoutOverview()
    cy.get(ele.cancelCheckoutButton).should("be.visible").click()
    cy.get(ele.title).should("have.text", "Products")
})

Cypress.Commands.add("withoutFirstName", function () {
    cy.checkout()
    cy.get(ele.firstName).clear()
    cy.get(ele.lastName).type(faker.person.lastName())
    cy.get(ele.zipCode).type(faker.location.zipCode())
    cy.get(ele.continueButton).click()
    cy.get(ele.ErrorMessage).should("have.text", "Error: First Name is required")
})

Cypress.Commands.add("withoutLastName", function () {
    cy.checkout()
    cy.get(ele.firstName).type(faker.person.firstName())
    cy.get(ele.lastName).clear()
    cy.get(ele.zipCode).type(faker.location.zipCode())
    cy.get(ele.continueButton).click()
    cy.get(ele.ErrorMessage).should("have.text", "Error: Last Name is required")
})

Cypress.Commands.add("withoutZipCode", function () {
    cy.checkout()
    cy.get(ele.firstName).type(faker.person.firstName())
    cy.get(ele.lastName).type(faker.person.lastName())
    cy.get(ele.zipCode).clear()
    cy.get(ele.continueButton).click()
    cy.get(ele.ErrorMessage).should("have.text", "Error: Postal Code is required")
})

Cypress.Commands.add("emptyFields", function () {
    cy.checkout()
    cy.get(ele.firstName).clear()
    cy.get(ele.lastName).clear()
    cy.get(ele.zipCode).clear()
    cy.get(ele.continueButton).click()
    cy.get(ele.ErrorMessage).should("have.text", "Error: First Name is required")
})