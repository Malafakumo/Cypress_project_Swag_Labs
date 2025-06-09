describe("Add to Cart Test", function () {

    beforeEach("", function () {
          cy.loginWithValidInputs()
    })

    it("Verify Product Details on the Products page", function () {
      cy.productDetails()
    })

    it("Verify user can add product to cart successfully", function () {
        cy.addProductToCart()
      })
    
    it("Verify user can remove product from cart on the product page", function () {
        cy.removeProduct()
      })
    
    it("Verify counter and user can click on cart", function () {
        cy.cartCounter()
      })

    it("Verify product details are correct on the Cart page", function () {
        cy.cartProductDetails()
      })

    it("Verify user can remove product on the cart page", function () {
         cy.cartRemoveProduct()
      })

    it("Verify Continue Shopping button responds to click", function () {
        cy.continueShopping()
      })

    it.only("Verify checkout button navigates user to the Checkout page", function () {
        cy.checkout()
      })
      
})
