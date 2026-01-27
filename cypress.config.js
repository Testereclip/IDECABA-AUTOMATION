const { defineConfig } = require('cypress');
const fs = require('fs-extra');
const path = require('path');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin');
const AdmZip = require('adm-zip');

function loadEnvConfig(environment) {
  const envPath = path.resolve(
    __dirname,
    'cypress',
    'env',
    `${environment}.json`
  );

  if (!fs.existsSync(envPath)) {
    throw new Error(`❌ No existe el archivo de ambiente: ${envPath}`);
  }

  return fs.readJsonSync(envPath);
}

module.exports = defineConfig({
  projectId: 'xvtr3c',

  retries: {
    runMode: 2,
    openMode: 0
  },

  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mocha-junit-reporter",
    mochaJunitReporterReporterOptions: {
      mochaFile: "cypress/results/test-results-[hash].xml",
      toConsole: true,
      attachments: true
    }
  },

  e2e: {
    setupNodeEvents(on, config) {
      const environment = config.env.environment || 'dev';
      const envConfig = loadEnvConfig(environment);

      // 🔹 baseUrl dinámico
      config.baseUrl = envConfig.baseUrl;

      // 🔹 inyectar variables del env/*.json
      config.env = {
        ...config.env,
        ...envConfig
      };

      // 🔹 Allure plugin
      allureWriter(on, config);

      // ✅ ALLURE ENVIRONMENT (ESTO ES LO QUE FALTABA)
on('before:run', (runDetails) => {
  const resultsPath = path.join(__dirname, 'allure-results');

  if (!fs.existsSync(resultsPath)) {
    fs.mkdirSync(resultsPath, { recursive: true });
  }

  const browserName =
    runDetails &&
    runDetails.browser &&
    runDetails.browser.name
      ? runDetails.browser.name
      : 'unknown';

  const envFileContent = `
Environment=${environment}
BaseUrl=${config.baseUrl}
Browser=${browserName}
`;

  fs.writeFileSync(
    path.join(resultsPath, 'environment.properties'),
    envFileContent.trim()
  );
});

      // 🔹 Tasks
      on('task', {
        deleteDownloads() {
          if (fs.existsSync(config.downloadsFolder)) {
            fs.emptyDirSync(config.downloadsFolder);
          }
          return null;
        },

        checkZipContainsShp(fileName) {
          const zipPath = path.join(__dirname, 'cypress', 'downloads', fileName);
          const zip = new AdmZip(zipPath);
          const entries = zip.getEntries();
          return entries.some(e => e.entryName.endsWith('.shp'));
        },

        downloadFile
      });

      return config;
    },

    supportFile: 'cypress/support/e2e.js',
    experimentalStudio: true,
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000
  }
});
