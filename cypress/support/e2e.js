
import '@shelex/cypress-allure-plugin';
import 'cypress-downloadfile/lib/downloadFileCommand';
import './commands';


Cypress.on('uncaught:exception', (err) => {
  // opcional: filtrar por mensaje
  if (err.message.includes('setShowModal is not defined')) {
    return false;
  }

  // o ignorar todas
  return false;
});
