describe("Note app", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.request("POST", "http://localhost:3001/api/blogs/reset");
  });
  it("front page can be opened", () => {
    cy.contains("Username");
    cy.contains("Password");
  });
  it("login form can be opened", function () {
    cy.contains("Enter").click();
    cy.contains("Wrong Password");
  });
  it("login form can be opened", function () {
    cy.get("input:first").type("kremlevma44x31");
    cy.get("input:last").type("1233331");
    cy.contains("Enter").click();
  });
});
