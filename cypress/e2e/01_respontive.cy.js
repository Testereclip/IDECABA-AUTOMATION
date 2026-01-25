describe('Validación responsive IDECABA - Mobile', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.visit('/');


  });

  it('Debe mostrar la barra lateral y el buscador en modo móvil', () => {
    // Verifica que el menú lateral exista y sus botones
    cy.get('#search-btn').should('be.visible'); //barra autocompleter 
    cy.get('.flex-grow-1').should('be.visible'); //barra lateral vertical
  })
  it('Debe mostrar Solo los botones capas, mas informacion y boton regresar', () => {
    cy.get('#paso3').should('be.visible'); // boton Mas informacion
    cy.get('#paso4').should('be.visible'); // boton Capas
    cy.get('.p-2 > .btn').should('be.visible'); //Boton regresar
  })
  it('Debe mostrar escala de zoom, boton de login, boton del portal', () => {
    cy.get('.leaflet-control-scale-line').should('be.visible'); //esala de zoom
    cy.get('.navbar-login').should('be.visible'); // Boton de ingresar
    cy.get('#paso17')
  .should('be.visible')
  .and('have.attr', 'href', Cypress.env('VITE_IDECABA_URL'));
    cy.get('.leaflet-bar-part').should('be.visible');// boton de ubicacion
    cy.contains('Visor de Mapas de la Ciudad de Buenos Aires')
  .should('not.be.visible');

  })

  it('No debe mostrar los boton de  normativa, intitucionalidad, tutoriales, contacto', () => {
    //No debe mostrar los boton de  normativa, intitucionalidad, tutoriales, contacto
    cy.get('#paso5').should('not.be.visible');
    cy.get('#paso6').should('not.be.visible');
    cy.get('#paso7').should('not.be.visible');
    cy.get('#paso10').should('not.be.visible');
    
  })
  
  it('No debe mostrar los botones del lado izquierdo como: impresion, herramientas de dibujo, medicion, ubicacion, edicion y borrado capas temporales y mapas', () => {
    //No debe mostrar los botones del lado izquierdo como: impresion, herramientas de dibujo, medicion, ubicacion, edicion y borrado
    //capas temporales y mapas
    cy.get('#leafletEasyPrint').should('not.be.visible');
    cy.get('#paso12').should('not.be.visible');

    cy.get('#paso14 > .leaflet-draw-toolbar').should('not.be.visible');
    cy.get('.leaflet-draw-draw-polyline').should('not.be.visible');
    cy.get('#paso21').should('not.be.visible');
    cy.get('#paso22').should('not.be.visible');
    cy.get('#paso23').should('not.be.visible');
    cy.get('#paso24').should('not.be.visible');
    cy.get('#paso15 > .leaflet-draw-toolbar').should('not.be.visible');
    cy.get('.wms-control-button').should('not.be.visible');
    cy.get('#paso8 > .btn').should('not.be.visible');
});

  it('Debe renderizar correctamente en varias resoluciones móviles', () => {
    const tamaños = [
      'iphone-6',
      'iphone-x',
      'samsung-s10',
      'iphone-xr',
      'samsung-s10',

    ];

    tamaños.forEach(size => {
      cy.viewport(size);
      cy.reload();

      // Comprueba que la UI no se rompe
      cy.get('input[placeholder="Buscar direcciones..."]').should('be.visible');
    });
  });


});

describe('Validación IDECABA - Desktop',() =>{
    beforeEach(() => { 
    cy.visit('/')
    cy.viewport(1920, 1080)
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })//Desactiva el registro de solicitudes
    })

  it('Validar Barra lateral Izquierda', () => {
    cy.get('.d-none').should('be.visible');
    cy.get('#paso17').should('have.attr', 'href', Cypress.env('VITE_IDECABA_URL'))
    cy.get('#paso5').should('have.attr','href',Cypress.env('NORMATIVA'))
    cy.get('#paso6').should('have.attr','href', Cypress.env('INSTITUCIONALIDAD'))
    cy.get('#paso1').click()
    cy.get('.reactour__popover', { timeout: 10000 }) // POP UP 1 DEL TURORIAL
    .should('be.visible')
    .and('contain', 'En este Visor podrás consultar, visualizar y consumir información geográfica de las distintas áreas de la ciudad, de manera centralizada e interactiva. La información provista es orientativa y no vinculante, al momento de realizar un trámite ante Gobierno de la Ciudad de Buenos Aires.')
    cy.get('[aria-label="Go to next step"]').click()
    cy.get('.reactour__popover', { timeout: 10000 }) // POP UP 2 DEL TURORIAL
    .should('be.visible')
    .and('contain', 'Acá vas a poder buscar por Dirección o Lugar y ubicarlo en el mapa.')
    cy.get('[aria-label="Go to next step"]').click()
    cy.get('.reactour__popover', { timeout: 10000 }) // POP UP 3 DEL TURORIAL
    .should('be.visible')
    .and('contain', 'Acá podrás obtener información sobre la capa que estás visualizando haciendo click derecho sobre el objeto deseado.')
    cy.get('[aria-label="Go to next step"]').click()
    cy.get('.reactour__popover', { timeout: 10000 }) // POP UP 4 DEL TURORIAL
    .should('be.visible')
    .and('contain', 'Acá vas a poder desplegar el Panel de Capas y explorar todas las capas de información disponibles agrupadas según temáticas, que podrás encender o apagar según lo que desees visualizar.')
    cy.get('[aria-label="Go to next step"]').click()
    cy.get('.reactour__popover', { timeout: 10000 }) // POP UP 5 DEL TURORIAL
    .should('be.visible')
    .and('contain', 'Acá podrás ver las Normativas que adopta y respaldan IDECABA.')
    cy.get('[aria-label="Go to next step"]').click()
    cy.get('.reactour__popover', { timeout: 10000 }) // POP UP 6 DEL TURORIAL
    .should('be.visible')
    .and('contain', 'Acá vas a poder ver una breve descripción de nuestra Organización.')
    cy.get('[aria-label="Go to next step"]').click()
    cy.get('.reactour__popover', { timeout: 10000 }) // POP UP 7 DEL TURORIAL
    .should('be.visible')
    .and('contain', 'Acá podrás enviarnos los comentarios que desees y contactarte con nosotros.')
    cy.get('[aria-label="Go to next step"]').click()
    cy.get('.reactour__popover', { timeout: 10000 }) // POP UP 8 DEL TURORIAL
    .should('be.visible')
    .and('contain', 'Acá vas a poder cambiar el mapa que se visualiza como base por otras opciones.')
    cy.get('[aria-label="Go to next step"]').click()
    cy.get('.reactour__popover', { timeout: 10000 }) // POP UP 9 DEL TURORIAL
    .should('be.visible')
    .and('contain', 'Acá podrás traer al visor otras capas provenientes de servicios ajenos y visualizarlas de manera temporal junto con el resto de la información del mapa. Colocá la url del servicio y elegí la capa que desees, se agregará al mapa y la verás en el apartado Mis Capas del Panel de Capas.')
    cy.get('[aria-label="Go to next step"]').click()
    cy.get('.reactour__popover', { timeout: 10000 }) // POP UP 10 DEL TURORIAL
    .should('be.visible')
    .and('contain', 'Acá vas a poder volver a la vista y zoom inicial.')
    cy.get('[aria-label="Go to next step"]').click()
    cy.get('.reactour__popover', { timeout: 10000 }) // POP UP 11 DEL TURORIAL
    .should('be.visible')
    .and('contain', 'Acá vas a poder imprimir o descargar una imagen del mapa que estás visualizando en pantalla.')
    cy.get('[aria-label="Go to next step"]').click()
    cy.get('.reactour__popover', { timeout: 10000 }) // POP UP 12 DEL TURORIAL
    .should('be.visible')
    .and('contain', 'Acá vas a poder medir una distancia en el mapa.')
    cy.get('[aria-label="Go to next step"]').click()
    cy.get('.reactour__popover', { timeout: 10000 }) // POP UP 13 DEL TURORIAL
    .should('be.visible')
    .and('contain', 'Acá podrás ver tu ubicación actual en el mapa.')
    cy.get('[aria-label="Go to next step"]').click()
    cy.get('.reactour__popover', { timeout: 10000 }) // POP UP 14 DEL TURORIAL
    .should('be.visible')
    .and('contain', 'Acá vas a poder dibujar líneas, polígonos y colocar marcadores en el mapa.')
    cy.get('[aria-label="Go to next step"]').click()
    cy.get('.reactour__popover', { timeout: 10000 }) // POP UP 15 DEL TURORIAL
    .should('be.visible')
    .and('contain', 'Acá podrá editar, modificar o borrar las figuras dibujadas.')
    cy.get('[aria-label="Go to next step"]').click()
    cy.get('.reactour__popover', { timeout: 10000 }) // POP UP 16 DEL TURORIAL
    .should('be.visible')
    .and('contain', 'Desde acá podrás visitar el Portal IDECABA.')
    cy.get('button[aria-label="Close Tour"]').click();//cierra el pop up

    cy.get('#paso7').click()
    cy.get('#contacto-informacion').should('contain','Contacto','Utilizá este formulario para hacernos llegar tus comentarios, sugerencias, consultas o críticas respecto a la IDECABA. Asegurate de ingresar una dirección de email válida para que podamos responderte.')
    cy.get('#contacto-informacion > :nth-child(1) > :nth-child(2) > .d-flex > :nth-child(1)').should('be.visible')
    cy.get('#contacto-informacion > :nth-child(1) > :nth-child(2) > .d-flex > :nth-child(2)').should('be.visible')
    cy.get('#contacto-informacion > :nth-child(1) > :nth-child(2) > .d-flex > :nth-child(3)').should('be.visible')
    cy.get('[style="width: 304px; height: 78px;"] > div > iframe').should('be.visible')
    cy.get(':nth-child(2) > .d-flex > .btn').should('be.visible')

    
    cy.get(':nth-child(2) > .d-flex > :nth-child(1) > .form-control').type('Prueba')
    cy.get('.d-flex > :nth-child(2) > .form-control').type('prueba@gmail.com')
    cy.get(':nth-child(3) > .form-control').type('esta es una prueba para validar el flujo de la seccion de Contacto')
    cy.get(':nth-child(2) > .d-flex > .btn').click()
    cy.get('.invalid-feedback').should('text','Por favor, verificar el Captcha')
// Verifica que el iframe está presente
    cy.get('iframe[title="reCAPTCHA"]').should('exist');


  }) 

    it('Validar iconos de HOME', () => {
    cy.get('#paso3').should('be.visible');
    cy.get('#paso4').should('be.visible');
    cy.get('#paso5').should('be.visible');
    cy.get('#paso6').should('be.visible');
    cy.get('#paso1').should('be.visible');
    cy.get('#paso7').should('be.visible');
    cy.get('.p-2 > .btn').should('be.visible');
    cy.get('.leaflet-control-minimap').should('be.visible');
    cy.get('.coordinates-control').should('be.visible');
    cy.get('.leaflet-control-scale-line').should('be.visible');
    cy.get('.wms-control-button').should('be.visible');
    cy.get('#paso8 > .btn').should('be.visible');
    cy.get('.initial-view-button').should('be.visible');
    cy.get('#leafletEasyPrint').should('be.visible');
    cy.get('.icon-ruler').should('be.visible');
    cy.get('.leaflet-bar-part').should('be.visible');
    cy.get('#paso14').should('be.visible');
    cy.get('#paso14 > .leaflet-draw-toolbar > #paso21').should('be.visible');
    cy.get('#paso22').should('be.visible');
    cy.get('#paso23').should('be.visible');
    cy.get('#paso24').should('be.visible');
    cy.get('#paso25').should('be.visible');
    cy.get('#paso15 > .leaflet-draw-toolbar > #paso20').should('be.visible');
    cy.get('#paso15 > .leaflet-draw-toolbar > #paso21').should('be.visible');
    cy.get('.btn-text').should('be.visible');
    cy.get('#paso2 > #search-btn').should('be.visible');
    cy.get('[data-tooltip="Zoom in"] > .zoom-control-button').should('be.visible');
    cy.get('[data-tooltip="Zoom out"] > .zoom-control-button').should('be.visible');
    cy.get('.d-none').should('be.visible');//Valida la presencia del logo
    cy.get('#paso17').should('have.attr','href',Cypress.env('VITE_IDECABA_URL'))
  })

    it('Validacion de búsquedas ', () => {
        const direcciones = ['corrientes 1300', 'azopardo 667', 'av belgrano 1345', 'bulnes 1780', 'gurruchaga 2018'];
        const sugerencias = ['CORRIENTES AV. 1300', 'AZOPARDO 667', 'BELGRANO AV. 1345', 'BULNES 1780', 'GURRUCHAGA 2018'];
      
        direcciones.forEach((direccion, index) => {
          cy.wait(1000); // espera antes de escribir
          cy.get('#paso2 > #search-btn').clear().type(direccion);
      
          cy.wait(1000); // espera después de escribir
          cy.get('.bg-light > :nth-child(1)', { timeout: 10000 })
            .should('be.visible')
            .should('have.text', sugerencias[index]) // verificamos que sea la sugerencia esperada
            .click();
      
          cy.wait(500); // espera antes de limpiar
          cy.get('#paso2 > .reset').dblclick();
          cy.wait(500); // espera después de limpiar
        })
    })

  it('Validar la barra de capas"', () => {

    // 1️⃣ Escribir en la barra de búsqueda
    cy.wait(1000);
    cy.get('#paso4.d-flex')
    .click()

    cy.get('input[placeholder*="Capas"]')
      .should('be.visible')
      .clear()
      .type('barrios');

    // 2️⃣ Validar Demarcación
    cy.contains('span.collapse-title', 'Demarcacion')
      .should('be.visible');
    
    cy.get('input[placeholder*="Capas"]')
      .clear()
      .type('vías');

    // 3️⃣ Validar Vías → Transporte
    cy.contains('span.collapse-title', 'Transporte')
      .should('be.visible');
      
    cy.get('input[placeholder*="Capas"]')
      .clear()
      .type('solar');
    // 4️⃣ Validar Solares → Ambiente
    cy.contains('span.collapse-title', 'Ambiente')
      .should('be.visible');
  });



      it('Debe renderizar correctamente en varias resoluciones de escritorio', () => {
  const resolucionesDesktop = [
    [1366, 768],   // laptop estándar
    [1440, 900],   // MacBook Pro 15
    [1920, 1080],  // Full HD
    [2560, 1440],  // 2K
  ];

  resolucionesDesktop.forEach(size => {
    cy.viewport(size[0], size[1]);
    cy.reload();

    // Validación mínima de que la UI no se rompe
    cy.get('input[placeholder="Buscar direcciones..."]').should('be.visible');

    // Y otras validaciones típicas de desktop
    cy.get('#paso5').should('be.visible');  // normativa
    cy.get('#paso6').should('be.visible');  // institucionalidad
    
  });
});

})
