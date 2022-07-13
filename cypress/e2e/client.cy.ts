describe('questionnaire as client', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('#start-button').click();
    cy.url().should('include', '/questionnaire');
    cy.get('.v-card__text').should('contain', 'Question 1 out of');
    cy.get('.v-list-item').first().click();
    cy.get('button').contains('Next').not('.v-btn--disabled').click();

    cy.get('.v-card__text').should('contain', 'Question 2 out of');
    cy.get('.v-list-item').first().click();
    cy.get('button').contains('Next').not('.v-btn--disabled').click();

    cy.get('.v-card__text').should('contain', 'Question 3 out of');
    cy.get('.v-list-item').first().click();
    cy.get('button').contains('Next').not('.v-btn--disabled').click();

    cy.get('.v-card__text').should('contain', 'Question 4 out of');
    cy.get('.v-list-item').first().click();
    cy.get('button').contains('Find my type').not('.v-btn--disabled').click();

    cy.get('.v-card__title').contains('Type - A');
  })
})
