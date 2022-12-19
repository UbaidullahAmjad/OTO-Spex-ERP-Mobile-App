import axios from 'axios';
import store from '../Store';
import {otherStatus} from './helper';

export const apiInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // 'Access-Control-Max-Age': 0
  },
});

apiInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${
      store.getState()?.user?.userData?.token
    }`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

apiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    otherStatus(error.response);
    return Promise.reject(error);
  },
);
