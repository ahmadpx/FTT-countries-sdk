import _find from 'lodash/find';
import _orderBy from 'lodash/orderBy';

/**
 * generate filters data
 * @param {Array<Object>} countries
 * @returns {{currencies: Array, languages: Array, regions: Array}}
 */
export function generateFiltersData(countries) {
  const filtersData = { currencies: [], languages: [], regions: [] };
  
  countries.forEach(country => {
    const { languages, currencies, region } = country;
    filtersData.currencies = generateCurrenciesFilterData(filtersData.currencies, currencies);
    filtersData.languages = generateLanguagesFilterData(filtersData.languages, languages);
    filtersData.regions = generateRegionsFilterData(filtersData.regions, region);
  });
  
  return {
    currencies: _orderBy(filtersData.currencies, ['count'], ['desc']),
    languages: _orderBy(filtersData.languages, ['count'], ['desc']),
    regions: _orderBy(filtersData.regions, ['count'], ['desc']),
  };
}

/**
 * generate currencies filter data
 * @param {Array<Object>} filterData
 * @param {Array<String>} currencies
 * @returns {Array<Object>}
 */
export function generateCurrenciesFilterData(filterData, currencies) {
  if (currencies.length === 0) return filterData;
  
  let data = [...filterData];
  
  currencies.forEach(currency => {
    const matchedFilter = _find(data, { value: currency });
    
    if (!matchedFilter) {
      data = data.concat({
        groupId: 'currencies',
        value: currency,
        count: 0,
      });
    }
    
    data = data.map(filter =>
      filter.value === currency
        ? {
          ...filter,
          count: filter.count + 1,
        }
        : filter,
    );
  });
  
  return data;
}

/**
 * generate languages filter data
 * @param {Array<Object>} filterData
 * @param {Array<String>} languages
 * @returns {Array<Object>}
 */
export function generateLanguagesFilterData(filterData, languages) {
  if (languages.length === 0) return filterData;
  
  let data = [...filterData];
  
  languages.forEach(language => {
    const matchedFilter = _find(data, { value: language });
    
    if (!matchedFilter) {
      data = data.concat({
        groupId: 'languages',
        value: language,
        count: 0,
      });
    }
    
    data = data.map(filter =>
      filter.value === language
        ? {
          ...filter,
          count: filter.count + 1,
        }
        : filter,
    );
  });
  
  return data;
}

/**
 * generate regions filter data
 * @param {Array<Object>} filterData
 * @param {String} region
 * @returns {Array<Object>}
 */
export function generateRegionsFilterData(filterData, region) {
  if (!region || !region.length) return filterData;
  
  const matchedFilter = _find(filterData, { value: region });
  
  if (!matchedFilter) {
    return filterData.concat({
      groupId: 'regions',
      value: region,
      count: 1,
    });
  }
  
  return filterData.map(filter =>
    filter.value === region
      ? {
        ...filter,
        count: filter.count + 1,
      }
      : filter,
  );
}
