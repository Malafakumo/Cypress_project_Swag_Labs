describe("Checkout Test", function () {

  beforeEach("", function () {
          cy.loginWithValidInputs()
    })

    it("Verify user can checkout successfully", function () {
      cy.successfulCheckout()
    })

    it("Verify the product details on the Checkout overview page", function () {
        cy.checkoutOverview()
      })

    it("Verify user can cancel on the Checkout overview page", function () {
        cy.cancelCheckout()
      })
    
    it("Verify user cannot checkout by leaving the first name field blank", function () {
        cy.withoutFirstName()
      })

    it("Verify user cannot checkout by leaving the last name field blank", function () {
        cy.withoutLastName()
      })

    it("Verify user cannot checkout by leaving the postal code field blank", function () {
        cy.withoutZipCode()
      })

    it("Verify user cannot checkout by leaving all fields blank", function () {
        cy.emptyCheckoutFields()
      })
})