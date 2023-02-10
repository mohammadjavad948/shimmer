import { api, authHeader, FixedLengthArray } from './api';
import { CardGroup } from './card_group';

export type Card = {
  id: number;
  question: string;
  answers: any;
  real_answer: any;
  group_id: number;
  creator_id: number;
  created_at: string;
};

export function allCards() {
  return api.get<Array<FixedLengthArray<[Card, CardGroup]>>>('/card', {
    headers: authHeader(),
  });
}

export function createCard(data: any) {
  return api.post<Card>('/card', data, {
    headers: authHeader(),
  });
}

export function updateCard(id: number, data: any) {
  return api.patch<Card>(`/card/${id}`, data, {
    headers: authHeader(),
  });
}

export function oneCard(id: number) {
  return api.get<Card>(`/card/${id}`, {
    headers: authHeader(),
  });
}

export function removeCard(id: number) {
  return api.delete(`/card/${id}`, {
    headers: authHeader(),
  });
}
