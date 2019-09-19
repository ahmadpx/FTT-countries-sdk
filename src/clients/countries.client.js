import axios from 'axios';

export default {
  /**
   * get all countries
   * @returns {Promise}
   */
  getAllCountries() {
    return axios({
      method: 'GET',
      url: 'https://restcountries-v1.p.rapidapi.com/all',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'restcountries-v1.p.rapidapi.com',
        'x-rapidapi-key': 'cb7970568amshb8d11a751d3a77bp139cf8jsn6dc8250a8bfd',
      },
    }).then(({ data }) => data);
  },
};
