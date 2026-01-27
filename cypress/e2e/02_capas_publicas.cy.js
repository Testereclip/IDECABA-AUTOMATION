describe('Capas públicas - integración WMS', () => {
  beforeEach(() => {
    // Paso 1: visitar la app
    cy.visit('/');
    // Paso 2: interceptar XHR/fetch si querés silenciar logs
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
      { retries: 2 }
  });
it('Carga capas, consume WMS y renderiza en mapa', () => {

    cy.intercept('GET', '**/visor/capas/publicas**').as('capasPublicas');

    cy.get('#paso4')
      .should('be.visible')
      .and('have.attr', 'href', '#/capas')
      .click();

    cy.wait('@capasPublicas')
      .its('response.statusCode')
      .should('eq', 200);

    cy.contains('.collapse-title', 'Demarcacion')
      .should('be.visible')
      .click();

    cy.get('input[type="checkbox"][id="Distritos Económicos"]')
      .should('exist')
      .and('not.be.checked')
      .check({ force: true });

    // ✅ Validar botón eliminar capa
    cy.get('.btn-eliminar-capas')
      .should('exist')
      .and('be.visible');

    // ✅ Validar contenedor Leaflet
    cy.get('.leaflet-tile-container')
      .should('exist')
      .and('be.visible');
      
    // ✅ Validar la renderizacion de la capa en el mapa
    cy.get('.leaflet-layer[style*="z-index: 20"]')
      .should('exist');

});
})
