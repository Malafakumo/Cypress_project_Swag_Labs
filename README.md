# Swag Labs Cypress Test Project

This project contains automated end-to-end tests for the [Swag Labs](https://www.saucedemo.com/) web application using [Cypress](https://www.cypress.io/).

## Project Structure

- `cypress/e2e/` - Test specifications
- `cypress/fixtures/` - Test data (JSON files)
- `cypress/support/` - Custom commands and support files

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Malafakumo/Cypress_project_Swag_Labs.git
   cd Cypress_project_Swag_Labs
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running Tests

To open the Cypress Test Runner:
```
npx cypress open
```

To run tests in headless mode:
```
npx cypress run
```

## Custom Commands

Custom Cypress commands are defined in the `cypress/support/` folder, including:
- `cy.successfulCheckout()`
- `cy.checkoutOverview()`
- ...and more

## Test Data

Selectors and test data are managed in `cypress/fixtures/example.json`.

## License

This project is licensed under the ISC License.

---

*Created by Akpos Malafakumo*