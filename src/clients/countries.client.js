import { $http } from '../services/http.service';
import { ENDPOINTS } from '../constants';

export default {
  /**
   * get all countries
   * @returns {Promise}
   */
  getAllCountries() {
    return $http.get(ENDPOINTS.GET_COUNTRIES).then(({ data }) => data);
  },
};
