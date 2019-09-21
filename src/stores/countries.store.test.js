import Joi from '@hapi/joi';
import CountriesStore from '../stores/countries.store';
import CountriesClient from '../clients/countries.client';
import countriesMock from '../__mocks__/countries.mock';
import CountrySchema from '../schemas/country.schema';
import filtersSchema from '../schemas/filters.schema';
import { API_STATE } from '../constants';

describe('CountriesStore', () => {
  describe('initialization', () => {
    it('should initialize store with empty `data` observable object', function() {
      const countriesStore = new CountriesStore();
      expect(countriesStore.data).toEqual([]);
    });

    it('should initialize store with initial api state', function() {
      const countriesStore = new CountriesStore();
      expect(countriesStore.API_STATE).toBe(API_STATE.INITIAL);
    });
  });

  describe('computed props', () => {
    let countriesStore;

    beforeAll(() => {
      countriesStore = new CountriesStore({ data: countriesMock });
      expect(countriesStore.data).toEqual(countriesMock);
    });

    it('should have countriesList matching countries schema', function() {
      Joi.validate(countriesStore.countries, Joi.array().items(CountrySchema), error => {
        expect(error).toBeNull();
      });
    });

    it('should generate filters data from countries list', function() {
      Joi.validate(countriesStore.filters, filtersSchema, error => {
        expect(error).toBeNull();
      });
    });
  });

  describe('actions', () => {
    describe('updateInitialState', () => {
      it('should initialize the store with initial state', function() {
        const countriesStore = new CountriesStore({ data: countriesMock, API_STATE: API_STATE.SUCCESS });
        expect(countriesStore.data).toEqual(countriesMock);
        expect(countriesStore.API_STATE).toEqual(API_STATE.SUCCESS);
      });
    });

    describe('fetch', () => {
      let getAllCountries;

      beforeAll(() => {
        getAllCountries = jest.spyOn(CountriesClient, 'getAllCountries');
      });

      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should fetch hotel info from server', async function() {
        const countriesStore = new CountriesStore();
        countriesStore.onSuccess = jest.fn();
        countriesStore.onError = jest.fn();
        getAllCountries.mockReturnValue(countriesMock);
        await countriesStore.fetch();
        expect(countriesStore.onSuccess).toHaveBeenCalledWith(countriesMock);
      });

      it('should call onError if the request failed', async function() {
        const countriesStore = new CountriesStore();
        const errorHandler = jest.fn();
        countriesStore.onError = jest.fn();
        getAllCountries.mockImplementation(() => {
          throw new Error('failed');
        });

        await countriesStore.fetch(errorHandler);

        expect(countriesStore.onError).toHaveBeenCalledWith(Error('failed'), errorHandler);
      });
    });

    describe('onSuccess', () => {
      it('should update the state with response data', function() {
        const countriesStore = new CountriesStore();
        countriesStore.onSuccess(countriesMock);
        expect(countriesStore.data).toEqual(countriesMock);
      });

      it('should update API_STATE with success', function() {
        const countriesStore = new CountriesStore();
        countriesStore.onSuccess(countriesMock);
        expect(countriesStore.API_STATE).toEqual(API_STATE.SUCCESS);
      });
    });

    describe('onError', () => {
      it('should call error handler with the error', function() {
        const countriesStore = new CountriesStore();
        const errorHandler = jest.fn();
        countriesStore.onError(Error('failed'), errorHandler);
        expect(errorHandler).toHaveBeenCalledWith(Error('failed'));
      });

      it('should update API_STATE with failed', function() {
        const countriesStore = new CountriesStore();
        const errorHandler = jest.fn();
        countriesStore.onError(Error('failed'), errorHandler);
        expect(countriesStore.API_STATE).toEqual(API_STATE.FAILED);
      });
    });
  });
});
