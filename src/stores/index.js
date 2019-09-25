import { configure } from 'mobx';
import CountriesListPageStore from './countries-list-page.store';

configure({ enforceActions: 'always' });

/**
 * Countries Product store
 */
export default class CountriesProductStore {
  /**
   * constructor
   * @param {Object} initialState
   */
  constructor(initialState = {}) {
    this.countriesList = new CountriesListPageStore(initialState.countriesList);
  }
}
