describe('Capas públicas - Mas informacion', () => {

  beforeEach(() => {
    cy.visit('/');

    // Intercept opcional para reducir logs
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
  });

  it('Flujo de capas publicas y panel Mas informacion', () => {

    cy.allure().step('Abrir panel de capas públicas');
    cy.get('#paso4')
      .should('be.visible')
      .and('have.attr', 'href', '#/capas')
      .click();

    cy.allure().step('Activar capa Catastro');
    cy.contains('.collapse-title', 'Catastro')
      .should('be.visible')
      .click();

    cy.get('input[type="checkbox"][id="Secciones Catastrales"]')
      .should('exist')
      .and('not.be.checked')
      .check({ force: true });

    cy.get('.btn-eliminar-capas')
      .should('exist')
      .and('be.visible');

    cy.get('.leaflet-tile-container')
      .should('be.visible');

    cy.get('.leaflet-layer[style*="z-index: 20"]')
      .should('exist');

    // 👉 clic derecho mapa
    cy.allure().step('Hacer clic derecho en el mapa');
    cy.get('.map-container')
      .should('be.visible')
      .rightclick();

    // 👉 validar navegación
    cy.allure().step('Validar panel Mas Información');
    cy.url({ timeout: 10000 })
      .should('include', '/#/masinformacion');

    cy.contains('.text-dark.fs-3.fw-normal', 'Información')
      .should('be.visible');

    // 👉 cerrar panel
    cy.get('button[aria-label="Close"]')
      .should('be.visible')
      .click();

    // 👉 validar regreso a capas SIN wait fijo
    cy.contains('.collapse-title', 'Catastro', { timeout: 10000 })
      .should('be.visible');

    cy.url().should('include', '/#/capas');
  });

});
