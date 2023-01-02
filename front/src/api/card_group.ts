import { api, authHeader } from './api';

export type CardGroup = {
  id: number;
  name: string;
  is_public: boolean;
  creator_id: number;
  created_at: string;
};

export function allCardGroup() {
  return api.get<CardGroup[]>('/card-group', {
    headers: authHeader(),
  });
}

export function createCardGroup(data: any) {
  return api.post<CardGroup>('/card-group', data, {
    headers: authHeader(),
  });
}

export function updateCardGroup(id: number, data: any) {
  return api.patch<CardGroup>(`/card-group/${id}`, data, {
    headers: authHeader(),
  });
}

export function oneCardGroup(id: number) {
  return api.get<CardGroup>(`/card-group/${id}`, {
    headers: authHeader(),
  });
}

export function removeCardGroup(id: number) {
  return api.delete(`/card-group/${id}`, {
    headers: authHeader(),
  });
}
