describe("Columns", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/dashboard")
    cy.get('[data-cy=project]').first().click();
  })

  it("Column is created and deleted", function () {
    // Created
    cy.get('[data-cy=column]').its('length').as('columnCount');

    cy.get('[data-cy=addColumn]').click()

    cy.get('[data-cy=column]').its('length').should(length => {
      expect(length).to.eq(this.columnCount + 1);
    });

    cy.wait(1000)

    // Deleted
    cy.get('[data-cy=column]').last().within(() => {
      cy.get('[data-cy=columnMenu]').click()
    });

    cy.get('[data-cy=deleteColumn]').click();

    cy.get('[data-cy=column]').its('length').should(length => {
      expect(length).to.eq(this.columnCount);
    });
  })
})