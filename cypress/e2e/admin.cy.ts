describe('questionnaire as admin', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('.v-card__actions > .v-btn--text').contains('Admin').click();
    cy.url().should('include', '/admin');
  })
})
