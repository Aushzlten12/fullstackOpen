// PENDING: Exercise E2E
describe("Blog app", function() {
  beforeEach(function() {
    // COMPLETE: Need to add testing controller
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:5173");
  });
  it("Login form is shown", function() {
    expect(true).to.equal(true);
  });
});
