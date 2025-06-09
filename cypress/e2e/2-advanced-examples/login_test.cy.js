// This test suite covers various login scenarios, including valid and invalid credentials, empty fields, and locked-out accounts.
// It uses custom Cypress commands defined in the support file to perform login actions and verify outcomes.

describe("Login Test", function () {

    it("verify login with valid credentials", function () {
      cy.loginWithValidInputs()
    })
  
    describe("Negative Login Scenarios", function () {
      it("verify login with invalid username", function () {
      cy.invalidUsername()
    })
  
      it("verify login with invalid password", function () {
      cy.invalidPassword()
    })
  
      it("verify login with empty fields", function () {
      cy.emptyFields()
    })
  
      it("verify that password is hidden", function () {
      cy.passwordisHidden()
    })

      it("verify login for a locked out account", function () {
      cy.lockedOutUser()
    })
  
  })
   })


