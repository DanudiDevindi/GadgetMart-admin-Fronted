import axios from 'axios';
import Cookies from "js-cookie";
import {baseUrl} from "./axios";

const instance = axios.create({
  baseURL: baseUrl.baseURL
});

instance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('access_token');
    config.headers.Authorization = 'Bearer ' + token;
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  async (error) => {
    const status = error.response ? error.response.status : 0;
    if (status === 401) {
      localStorage.clear();
      Cookies.remove('userId');
      Cookies.remove('userRole');
      Cookies.remove('firstName');
      Cookies.remove('lastName');
      Cookies.remove('access_token');
      Cookies.remove('login_response');
      window.location = '/login'
    }
  }
);

export default instance;
