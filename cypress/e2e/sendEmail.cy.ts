describe('Send email page', () => {
  it('Renders send email form successfully', () => {
    cy.visit('http://localhost:3000');

    cy.get('label').contains('Email').should('be.visible');
    cy.get('label').contains('Assunto').should('be.visible');
    cy.get('label').contains('Corpo').should('be.visible');
    cy.get('button').contains('Enviar').should('be.visible');
  });

  it('Renders send email form successfully', () => {
    cy.visit('http://localhost:3000');

    cy.get('#email').type('email@codersclub.com.br');
    cy.get('#subject').type('Assunto do email');
    cy.get('#body').type('Corpo do email');
    cy.get('button').contains('Enviar').click();

    cy.get('span').contains('Email enviado com sucesso!');
  });

  it('Shows error message when send email request fails', () => {
    cy.intercept('POST', '/api/email/send', {
      statusCode: 500,
      body: {},
    });
    cy.visit('http://localhost:3000');

    cy.get('#email').type('email@codersclub.com.br');
    cy.get('#subject').type('Assunto do email');
    cy.get('#body').type('Corpo do email');
    cy.get('button').contains('Enviar').click();

    cy.get('span').contains('Houve um erro ao enviar seu email!');
  });
});

export {};
