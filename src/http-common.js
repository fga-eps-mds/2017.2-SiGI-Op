import axios from 'axios';

const HTTP = axios.create({
  baseURL: 'http://0.0.0.0:8000',
});

export { HTTP as default };
