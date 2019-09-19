const colors = require('colors');
const CountriesClient = require('./clients/countries.client').default;
const fs = require('fs');
const path = require('path');

async function updateMocks() {
  console.log('Started fetching countries...'.cyan);
  const countries = await CountriesClient.getAllCountries();
  console.log('✔ Succeeded fetching countries'.green);
  writeMockFile(path.join(process.cwd(), 'src', '__mocks__', 'countries.mock.js'), countries);
}

updateMocks();

/**
 * write mock file
 * @param {string} filePath
 * @param {any} mock
 */
function writeMockFile(filePath, mock) {
  const mockData = `export default ${JSON.stringify(mock)}`;

  console.log(`updating ${filePath} ...`.cyan);

  fs.writeFile(filePath, mockData, error => {
    if (error) {
      console.error(`Failed updating ${filePath}`.red);
      console.error(error);
      process.exit(0);
    }

    console.log(`✔ ${filePath} updated successfully`.green);
  });
}
