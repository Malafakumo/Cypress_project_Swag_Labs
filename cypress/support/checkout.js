import { faker } from '@faker-js/faker';

let selectors

before("", function () {
    cy.fixture('example').then(function (exampleData) {
        selectors = exampleData
    })
})

/**
 * Command: Fill checkout form with parameters and continue
 * @param {} firstName
 * @param {} lastName
 * @param {} zipCode
 */
Cypress.Commands.add("fillCheckoutForm", (firstName, lastName, zipCode) => {
    cy.get(selectors.checkout.firstName).clear().type(faker.person.firstName());
    cy.get(selectors.checkout.lastName).clear().type(faker.person.lastName());
    cy.get(selectors.checkout.zipCode).clear().type(faker.location.zipCode());
    cy.get(selectors.checkout.continueButton).click();
});

// Command: Perform a successful checkout
Cypress.Commands.add("successfulCheckout", function () {
    cy.checkout();
    cy.fillCheckoutForm()
    cy.get(selectors.checkout.finishButton).should("be.visible").click();
    cy.get(selectors.checkout.completeCheckout).should("have.text", "Thank you for your order!");
});

/**
 * Command: Verify checkout overview details
 */
Cypress.Commands.add("checkoutOverview", function () {
    cy.checkout();
    cy.get(selectors.checkout.firstName).type(faker.person.firstName());
    cy.get(selectors.checkout.lastName).type(faker.person.lastName());
    cy.get(selectors.checkout.zipCode).type(faker.location.zipCode());
    cy.get(selectors.checkout.continueButton).click();
    cy.get(selectors.checkout.paymentInfo).should("have.text", "SauceCard #31337");
    cy.get(selectors.checkout.shippingInfo).should("have.text", "Free Pony Express Delivery!");
    cy.get(selectors.checkout.totalPrice).contains("$10.79");
});

/**
 * Command: Cancel checkout from overview page
 */
Cypress.Commands.add("cancelCheckout", function () {
    cy.checkoutOverview();
    cy.get(selectors.checkout.cancelButton).should("be.visible").click();
    cy.get(selectors.pageTitle).should("have.text", "Products");
});

/**
 * Command: Attempt checkout with first name missing
 */
Cypress.Commands.add("withoutFirstName", function () {
    cy.checkout();
    cy.get(selectors.checkout.firstName).clear();
    cy.get(selectors.checkout.lastName).type(faker.person.lastName());
    cy.get(selectors.checkout.zipCode).type(faker.location.zipCode());
    cy.get(selectors.checkout.continueButton).click();
    cy.get(selectors.errorMessage).should("have.text", "Error: First Name is required");
});

/**
 * Command: Attempt checkout with last name missing
 */
Cypress.Commands.add("withoutLastName", function () {
    cy.checkout();
    cy.get(selectors.checkout.firstName).type(faker.person.firstName());
    cy.get(selectors.checkout.lastName).clear();
    cy.get(selectors.checkout.zipCode).type(faker.location.zipCode());
    cy.get(selectors.checkout.continueButton).click();
    cy.get(selectors.errorMessage).should("have.text", "Error: Last Name is required");
});

/**
 * Command: Attempt checkout with postal code missing
 */
Cypress.Commands.add("withoutZipCode", function () {
    cy.checkout();
    cy.get(selectors.checkout.firstName).type(faker.person.firstName());
    cy.get(selectors.checkout.lastName).type(faker.person.lastName());
    cy.get(selectors.checkout.zipCode).clear();
    cy.get(selectors.checkout.continueButton).click();
    cy.get(selectors.errorMessage).should("have.text", "Error: Postal Code is required");
});

/**
 * Command: Attempt checkout with all fields blank
 */
Cypress.Commands.add("emptyCheckoutFields", function () {
    cy.checkout();
    cy.get(selectors.checkout.firstName).clear();
    cy.get(selectors.checkout.lastName).clear();
    cy.get(selectors.checkout.zipCode).clear();
    cy.get(selectors.checkout.continueButton).click();
    cy.get(selectors.errorMessage).should("have.text", "Error: First Name is required");
});