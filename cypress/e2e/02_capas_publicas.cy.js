describe('Barra de busqueda de capas y de direcciones', () => {
  beforeEach(() => {
    // Paso 2: visitar la app
    cy.visit('/');


    // Paso 3: interceptar XHR/fetch si querés silenciar logs
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
  });
    it('Capas publicas', () => {
      cy.get('#paso4 > .fs-5 > .material-symbols-outlined').should('be.visible');
      cy.get('#paso4').click()

    })
})    
  