import axios from 'axios';

export const $http = axios.create({
  headers: {
    'content-type': 'application/octet-stream',
    'x-rapidapi-host': 'restcountries-v1.p.rapidapi.com',
    'x-rapidapi-key': 'cb7970568amshb8d11a751d3a77bp139cf8jsn6dc8250a8bfd',
  },
});
