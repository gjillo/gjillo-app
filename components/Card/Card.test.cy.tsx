import CardInner from "./Card";

const name = 'Testing'
const deadline = '2020-12-12'
const tags = [
  {
    value: 'tag1',
    uuid: '123',
    color: '#121212'
  },
  {
    value: 'tag2',
    uuid: '321',
    color: '#454545'
  },
]

const assignees = [
  {
    name: "John"
  },
  {
    name: 'Jack'
  }
]

describe("Card component", () => {
  it('renders data', () => {
    cy.mount(<CardInner name={'Testing'} deadline='2020-12-12' tags={tags} assignees={assignees}  />)
    cy.contains(name)
    const deadlineSplit = deadline.split('-')
    cy.contains(deadlineSplit[0])
    cy.contains(deadlineSplit[1])
    cy.contains(deadlineSplit[2])
    cy.contains(tags[0].value)
    cy.contains(tags[1].value)

    cy.get('[data-cy="assigneeImage"]').should('have.length', 2)
    cy.get('[data-cy="assigneeImage"]').last().click()
    cy.contains(assignees[0].name)
    cy.get('[data-cy="assigneeImage"]').first().click()
    cy.contains(assignees[1].name)
  })
})