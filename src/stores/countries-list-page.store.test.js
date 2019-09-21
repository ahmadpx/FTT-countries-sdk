import CountriesListPageStore from './countries-list-page.store';
import countriesMock from '../__mocks__/countries.mock';
import { getInitialFilterState } from '../utils/filters.utils';

describe('countries list page store', () => {
  let countriesListPageStore;

  beforeAll(() => {
    countriesListPageStore = new CountriesListPageStore({ countries: { data: countriesMock } });
  });

  describe('filtering countries', () => {
    beforeEach(() => {
      countriesListPageStore.resetAllFilters();
    });

    it('should be able to check if a filter is selected', function() {
      const region = countriesListPageStore.countriesStore.filters.regions[0];
      countriesListPageStore.setFilter(region);
      expect(countriesListPageStore.isSelectedFilter(region)).toBeTruthy();
      countriesListPageStore.resetFilter(region);
      expect(countriesListPageStore.isSelectedFilter(region)).toBeFalsy();
    });

    it('should be able to reset all filters', function() {
      const regionFilter = countriesListPageStore.countriesStore.filters.regions[0];
      countriesListPageStore.setFilter(regionFilter);
      expect(countriesListPageStore.filtersState).not.toEqual(getInitialFilterState());
      countriesListPageStore.resetAllFilters();
      expect(countriesListPageStore.filtersState).toEqual(getInitialFilterState());
    });

    it('should be able to filter by language', function() {
      const filter = countriesListPageStore.countriesStore.filters.languages[0];

      countriesListPageStore.setFilter(filter);

      countriesListPageStore.countriesList.forEach(country => {
        expect(country.languages).toEqual(
          expect.arrayContaining(countriesListPageStore.filtersState.languages.slice()),
        );
      });
    });

    it('should be able to filter by currency', function() {
      const filter = countriesListPageStore.countriesStore.filters.currencies[0];

      countriesListPageStore.setFilter(filter);

      countriesListPageStore.countriesList.forEach(country => {
        expect(country.currencies).toEqual(
          expect.arrayContaining(countriesListPageStore.filtersState.currencies.slice()),
        );
      });
    });

    it('should be able to filter by region', function() {
      const filter = countriesListPageStore.countriesStore.filters.regions[0];

      countriesListPageStore.setFilter(filter);

      countriesListPageStore.countriesList.forEach(country => {
        expect(countriesListPageStore.filtersState.regions).toContain(country.region);
      });
    });
  });
});
