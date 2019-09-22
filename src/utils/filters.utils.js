import _filter from 'lodash/filter';
import _every from 'lodash/every';
import _some from 'lodash/some';

/**
 * initialize filters state
 * @param filterState
 * @returns {{languages: Array<string>, currencies: Array<string>, regions: Array<string>}}
 */
export function getInitialFilterState(filterState = {}) {
  return {
    languages: filterState['languages'] || [],
    currencies: filterState['currencies'] || [],
    regions: filterState['regions'] || [],
  };
}

/**
 * filter results by array of filters
 *
 * @param {Array<object>} countries
 * @param {object} filtersState
 * @param {Boolean} showPricePerNight
 * @returns {Array<object>} filtered results
 */
export function filterCountries({ countries, filtersState }) {
  const { languages, currencies, regions } = filtersState;
  return _filter(countries, country =>
    _every([
      isValidLanguage(country, languages),
      isValidCurrency(country, currencies),
      isValidRegion(country, regions),
    ]),
  );
}

/**
 * is valid language
 * @param {object} country
 * @param {Array<string>} languages
 * @return {boolean}
 */
export function isValidLanguage(country, languages) {
  if (!languages.length) return true;

  return _some(languages.map(language => country.languages.includes(language)));
}

/**
 * is valid currency
 * @param {object} country
 * @param {Array<string>} currencies
 * @return {boolean}
 */
export function isValidCurrency(country, currencies) {
  if (!currencies.length) return true;

  return _some(currencies.map(currency => country.currencies.includes(currency)));
}

/**
 * is valid region
 * @param {object} country
 * @param {Array<string>} regions
 * @return {boolean}
 */
export function isValidRegion(country, regions) {
  if (!regions.length) return true;

  return regions.includes(country.region);
}
