describe('Descargas de capas', () => {

  beforeEach(() => {
    cy.task('deleteDownloads');
    cy.visit('/');

    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
        Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
  });

  it('Validar que se descarguen las capas en distintos formatos', () => {
    cy.viewport(1920, 1080)
    cy.get('#paso4 > .fs-5 > .material-symbols-outlined')
      .should('be.visible');

    cy.get('#paso4').click();//Abre la seccion de capas

    cy.contains('.collapse-title', 'Demarcacion')
      .should('be.visible')
      .click();//desplega la categoria de Demarcacion 

    cy.contains('.form-checkbox', 'Distritos Económicos')
      .parents('li')
      .find('[data-tooltip="Descargar Datos"] span.material-symbols-outlined')
      .click()




// Hace clic en el boton de descargas

    // ⬇️ Descarga 1 (por ejemplo SHP)
    cy.get('#modalDescarga div:nth-child(1) > a.btn').click();
    cy.readFile('cypress/downloads/distritos_economicos.vnd.google-earth.kml+xml', { timeout: 15000 })
      .should('exist');

    // ⬇️ Descarga 2 (GeoJSON)
    cy.get('#modalDescarga div:nth-child(2) > a.btn').click();
    cy.readFile('cypress/downloads/distritos_economicos.zip', { timeout: 15000 })
      .should('exist');
    //Descarga 3 – GeoJSON
    cy.get('#modalDescarga div:nth-child(3) a.btn').click();

    cy.readFile(
  'cypress/downloads/distritos_economicos.json',{ timeout: 18000 }
)
  .should('exist')
  .then((json) => {
    expect(json.type).to.eq('FeatureCollection');
    expect(json.features).to.be.an('array');
    expect(json.features.length).to.be.greaterThan(0);
    expect(json.features[0].geometry).to.have.property('type');
    expect(json.features[0].geometry).to.have.property('coordinates');
    expect(json.features[0]).to.have.property('properties');

    // validación de contenido real
    const tieneDistrito = json.features.some(feature =>
      feature.id?.includes('distritos_economicos')
    );

    expect(tieneDistrito).to.eq(true);
    });

    cy.get('#modalDescarga')
    .find('button[aria-label="Cerrar"]')
    .click();// cierra el pop up de descargas
    cy.contains('.collapse-title', 'Deporte y recreacion')
      .should('be.visible')
      .click();//desplega la categoria de Deporte y recreacion
          cy.contains('.form-checkbox', 'Pistas de Skate') //Hace clic en el boton de descargas
      .parents('li')
      .find('[data-tooltip="Descargar Datos"] span.material-symbols-outlined')
      .click()
        // ⬇️ Descarga 1 (por ejemplo SHP)
    cy.get('#modalDescarga div:nth-child(1) > a.btn').click();
    cy.readFile('cypress/downloads/pistas_skate.vnd.google-earth.kml+xml', { timeout: 15000 })
      .should('exist');
  
    // ⬇️ Descarga 2 (GeoJSON)
    cy.get('#modalDescarga div:nth-child(2) > a.btn').click();
    cy.readFile('cypress/downloads/pistas_skate.zip', { timeout: 15000 })
      .should('exist');
    //Descarga 3 – GeoJSON
    cy.get('#modalDescarga div:nth-child(3) a.btn').click();

    cy.readFile(
  'cypress/downloads/pistas_skate.json',
  { timeout: 15000 }
)
  .should('exist')
  .then((json) => {
    expect(json.type).to.eq('FeatureCollection');
    expect(json.features).to.be.an('array');
    expect(json.features.length).to.be.greaterThan(0);
    expect(json.features[0].geometry).to.have.property('type');
    expect(json.features[0].geometry).to.have.property('coordinates');
    expect(json.features[0]).to.have.property('properties');

    // validación de contenido real
    const tieneDistrito = json.features.some(feature =>
      feature.id?.includes('pistas_skate')
    );

    expect(tieneDistrito).to.eq(true);
    });  
        cy.get('#modalDescarga')
    .find('button[aria-label="Cerrar"]')
    .click();// cierra el pop up de descargas
  });
     
});
