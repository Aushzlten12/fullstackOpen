// PENDING: Exercise E2E
describe("Blog app", function() {
  beforeEach(function() {
    // COMPLETE: Need to add testing controller
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:5173");
  });
  it("Login form is shown", function() {
    // NOTE: Verify if exist a form
    cy.get("form").as("loginForm");
    cy.get("@loginForm").should("exist");
    // IMPORTANT: For each element in form verify if exist and is in the form
    cy.get("@loginForm")
      .find("#usernameInput")
      .should("exist")
      .should("be.visible");
    cy.get("@loginForm")
      .find("#passwordInput")
      .should("exist")
      .should("be.visible");
    cy.get("@loginForm")
      .contains(/username/i)
      .should("exist");
    cy.get("@loginForm")
      .contains(/password/i)
      .should("exist");
    cy.get("@loginForm")
      .find("#submitButton")
      .should("exist")
      .should("be.visible");
    // COMPLETE: The form contains
  });
});
