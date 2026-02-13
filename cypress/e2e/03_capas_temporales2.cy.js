describe('Capas Temporales', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
    cy.viewport(1920, 1080)
  })

  it('Verificación carga WMS y activación de capa', () => {

    // 🔹 Abrir panel de capas temporales
    cy.get('[data-cy="open-wms-panel"]').first().click()

    // 🔹 Ingresar URL WMS
    cy.get('.input-group > .search-container > #search-btn').type(
    'https://geoserver.buenosaires.gob.ar/geoserver/catalogo_og_130/wms',
    { delay: 0 }
    )


    // 🔹 Buscar capas
    cy.get('[data-cy="wms-search-button"]').click()

    // 🔹 Abrir dropdown de capas
    cy.get('[data-cy="wms-layer-dropdown"]')
      .should('be.visible')
      .click()

    // 🔹 Seleccionar capa
      cy.get(':nth-child(1) > [data-cy="layer-checkbox-agencias-viaje"]')//quitarle al html el nombre agencia de viaje
      .click()


    // 🔹 Cerrar modal
    cy.get('[data-cy="wms-modal"]').within(() => {
      cy.get('[data-cy="close-wms-modal"]').click()
    })

    // 🔹 Validaciones finales
    cy.get('[data-cy="active-layers-badge"]')
    .should('be.visible')// texto de capas
    .and('have.text','Capas activas: 1')
    cy.get('[data-cy="layer-search-capas"]')
    .should('be.visible')
  })
})
