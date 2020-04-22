describe('Appointments', () => {
  beforeEach(() => {
    cy.request('GET', 'http://localhost:3000/api/debug/reset');
    cy.visit('/');
  });
  it('should book an interview', () => {
    cy.contains('Monday');

    cy.get('[alt=Add]').first().click();

    cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones');

    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains('Save').click();
  });
});
