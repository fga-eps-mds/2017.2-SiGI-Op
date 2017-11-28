import axios from 'axios';

const HTTP = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://obscure-escarpment-75407.herokuapp.com',
});

export { HTTP as default };
