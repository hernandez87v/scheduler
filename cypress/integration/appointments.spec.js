describe('Appointments', () => {
  it('should book an interview', () => {
    cy.visit('/');

    cy.contains('[data-testid=day]', 'Monday');
  });
});
