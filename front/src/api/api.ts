import axios from 'axios';
import useTokenStore from '../store/tokenStore';

export const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export function authHeader() {
  return {
    auth: useTokenStore.getState().token,
  };
}
