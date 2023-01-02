import axios from 'axios';
import { authHeader } from './api';

export type CardGroup = {
  id: number;
  name: string;
  is_public: boolean;
  creator_id: number;
  created_at: string;
};

export function allCardGroup() {
  return axios.get<CardGroup[]>('/card-group/', {
    headers: authHeader(),
  });
}

export function createCardGroup(data: any) {
  return axios.post<CardGroup>('/card-group/', data, {
    headers: authHeader(),
  });
}

export function updateCardGroup(id: number, data: any) {
  return axios.patch<CardGroup>(`/card-group/${id}`, data, {
    headers: authHeader(),
  });
}

export function oneCardGroup(id: number) {
  return axios.get<CardGroup>(`/card-group/${id}`, {
    headers: authHeader(),
  });
}

export function removeCardGroup(id: number) {
  return axios.delete(`/card-group/${id}`, {
    headers: authHeader(),
  });
}
