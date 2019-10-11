import axios from 'axios';

export default () => axios.create({
  baseURL: 'http://localhost:3030/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
