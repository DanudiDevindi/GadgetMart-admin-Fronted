import axios from 'axios';

export const baseUrl = {
  baseURL: 'http://localhost:8080',
  
};

const instance = axios.create({
  baseURL: baseUrl.baseURL
});


export default instance;
