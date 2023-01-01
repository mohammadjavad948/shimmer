import { api } from './api';

export function login(body: any) {
  return api.post('/auth/login', body);
}

export function signup(body: any) {
  return api.post('/auth/signup', body);
}
