describe("Dashboard tests", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/dashboard")
  })

  it("Projects list loads", () => {
    cy.get('[data-cy=project]').should('have.length.gte', 0)
  })

  it("Project opens", function () {
    cy.get('[data-cy=project]').first().invoke('text').as('projectName');

    cy.get('[data-cy=project]').first().click();

    cy.get('[data-cy=name]').should(($name) => {
      expect($name.text()).to.eq(this.projectName);
    });
  })
})


