describe("Check if projects load", () => {
  before(() => {
    cy.log(`Visiting localhost:3000`)
    cy.visit("localhost:3000")
  })
  it("Projects", () => {
    cy.contains('My First Project').click();
  })
})