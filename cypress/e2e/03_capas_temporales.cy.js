describe('Capas Temporales',() =>{
    beforeEach(() => { //Ejecutar código antes de cada prueba
    cy.visit('/')
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })//Desactiva el registro de solicitudes

    })



    it('Verificacion', () => {
        cy.viewport(1920, 1080) // o cualquier tamaño más grande
        cy.get('.wms-control-button').click();
        cy.get('input[placeholder="http://tu-servidor.com/geoserver/wms"]') // Abre el modal / panel de carga WMS
        .should('be.visible') //verifica que sea visible
        .clear()
        .type('https://geoserver.buenosaires.gob.ar/geoserver/catalogo_og_130/wms', { delay: 0 });
        cy.get('input[placeholder="http://tu-servidor.com/geoserver/wms"]')//Busca el input del WMS usando el placeholder (selector claro y estable)
        .closest('form')
        .within(() => {
        cy.get('button[type="submit"][aria-label="Buscar"]').click();//Hace click en el botón Buscar del formulario WMS
        });

        cy.get('#btnDropdownRadioJs').should('be.visible')//Verifica que el dropdown de capas esté visible
        cy.get('.btn-dropdown-icon').click()//Abre el dropdown de selección de capas
        cy.get('.dropdown-menu.show[data-popper-placement="bottom-start"]')
        .should('be.visible')//verifica que sea visible
        cy.get('label.form-checkbox-label[for="agencias_viaje"]')
        .click();//Selecciona la capa ign:area_de_montana haciendo click en su label
        cy.get('#agencias_viaje').should('be.checked');//validar que el checkbox esté activo

        cy.get('#wmsmodal')
        .within(() => {
        cy.get('button.btn-close[aria-label="Cerrar"]').click();
        cy.get('#wmsmodal').should('not.exist');
        cy.get('label.form-checkbox-label[for="agencias_viaje"]')
        .should('exist')
        .and('contain.text', 'agencias_viaje');

  });






}) 
})
