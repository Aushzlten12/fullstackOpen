// PENDING: Exercise E2E
describe("Blog app", function() {
  beforeEach(function() {
    // COMPLETE: Need to add testing controller
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    // COMPLETE: Create a user to backend
    const user = {
      name: "Aushalten12",
      username: "aushalten",
      password: "root",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:5173");
  });
  // TEST: When I open the web page it should show me the login form
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
  // TEST: Login Form behavior
  // COMPLETE: Add Login tests
  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      // COMPLETE: Type in the inputs correct credentials to log in
      cy.get("#usernameInput").type("aushalten");
      cy.get("#passwordInput").type("root");
      cy.get("#submitButton").click();
      cy.get("p")
        .invoke("text")
        .should("match", /Aushalten12 logged in/i);
    });
    it("fails with wrong credentials", function() {
      // COMPLETE: Type in the inputs wrong credentials and should show error message
      cy.get("#usernameInput").type("aushalten");
      cy.get("#passwordInput").type("wrong");
      cy.get("#submitButton").click();
      // IMPORTANT: Assertions for error message
      cy.contains("wrong username or password").should(
        "have.css",
        "color",
        "rgb(127, 29, 29)",
      );
      cy.contains("wrong username or password")
        .parent()
        .should("have.css", "background-color", "rgb(254, 226, 226)");
      cy.get("img")
        .should("have.attr", "alt", "error")
        .should(function($img) {
          const srcValue = $img.attr("src");
          expect(srcValue).to.match(/error.png/i);
        });
    });
  });
  // TEST: When user legged in ...
  describe("When logged in", function() {
    beforeEach(function() {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "aushalten",
        password: "root",
      }).then(({ body }) => {
        localStorage.setItem("loggedBlogappUser", JSON.stringify(body));
        cy.visit("http://localhost:5173");
      });
    });

    it("A blog can be created", function() {
      cy.contains(/new blog/i).click();
      cy.get("#inputTitle").type("Blog for testing E2E");
      cy.get("#inputUrl").type("https://E2ETest.com");
      cy.get("#buttonCreateBlog").click();
      cy.get(".blog")
        .should("have.length", 1)
        .find("h1")
        .should("contain.text", "Blog for testing E2E");
      cy.get(".blog").contains("aushalten");
      cy.contains(/show/i).click();
      cy.contains(/https:\/\/E2ETest.com/i);
    });

    describe("When create a new blog", function() {
      beforeEach(function() {
        cy.request({
          url: "http://localhost:3003/api/blogs",
          method: "POST",
          body: {
            title: "Blog to test with cypress",
            url: "http://Blog/test.com",
          },
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loggedBlogappUser")).token}`,
          },
        });
        cy.visit("http://localhost:5173");
      });
      it("User can like a blog", function() {
        cy.contains(/show/i).click();
        cy.get("#likeButton").should("have.text", "0");
        cy.get("#likeButton").click();
        cy.get("#likeButton").should("have.text", "1");
      });
      it.only("User can be delete his blog", function() {
        cy.get("#removeButton").click();
        cy.contains("Blog to test with cypress has removed").should(
          "have.css",
          "color",
          "rgb(20, 83, 45)",
        );
        cy.contains("Blog to test with cypress has removed")
          .parent()
          .should("have.css", "background-color", "rgb(220, 252, 231)");
        cy.get(".blog").should("have.length", 0);
      });
    });
  });
});
