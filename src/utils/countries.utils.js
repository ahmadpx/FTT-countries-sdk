/**
 * format country
 * @param {Object} country
 * @returns {{name: String, capital: String, region: String, population: String, currencies: Array<String>, languages: Array<String>}}
 */
export function formatCountry(country = {}) {
  return {
    name: country.name,
    capital: country.capital,
    region: country.region,
    population: country.population,
    currencies: country.currencies,
    languages: country.languages,
    code: country.alpha2Code,
  };
}
