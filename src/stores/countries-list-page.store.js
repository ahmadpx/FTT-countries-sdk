import { observable, computed, action } from 'mobx';
import { computedFn } from 'mobx-utils';
import { filterCountries, getInitialFilterState } from '../utils/filters.utils';
import CountriesStore from './countries.store';

export default class CountriesListPageStore {
  /**
   * constructor
   * @param {Object} initialState
   */
  constructor(initialState = {}) {
    this.countriesStore = new CountriesStore(initialState.countries);
  }

  @observable filtersState = getInitialFilterState();

  /**
   * countries list
   * @returns {Array<Object>}
   */
  @computed get countriesList() {
    return filterCountries({
      countries: this.countriesStore.countries,
      filtersState: this.filtersState,
    });
  }

  /**
   * is selected filter
   * @param {{groupId, value}} filter
   * @return {Boolean}
   */
  isSelectedFilter = computedFn(filter => {
    return this.filtersState[filter.groupId].includes(filter.value);
  });

  /**
   * set filter
   * @param {{groupId, value}} filter
   */
  @action.bound
  setFilter(filter) {
    this.filtersState[filter.groupId].push(filter.value);
  }

  /**
   * reset filter
   * @param {{groupId, value}} filter
   */
  @action.bound
  resetFilter(filter) {
    this.filtersState[filter.groupId] = this.filtersState[filter.groupId].filter(value => value !== filter.value);
  }

  /**
   * toggleFilter
   * @param {{groupId, value}} filter
   */
  @action.bound
  toggleFilter(filter) {
    this.isSelectedFilter(filter) ? this.resetFilter(filter) : this.setFilter(filter);
  }

  /**
   * reset all filters
   */
  @action.bound
  resetAllFilters() {
    this.filtersState = getInitialFilterState();
  }
}
