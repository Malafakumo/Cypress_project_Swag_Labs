describe("Login Test", function () {

    it("verify login with valid credentials", function () {
      cy.loginWithValidInputs()
    })
  
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
  
  })