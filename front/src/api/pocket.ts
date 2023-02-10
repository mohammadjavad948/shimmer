import { api, authHeader, FixedLengthArray } from "./api";
import { Card } from "./card";

interface CardInPocket {

}

interface PocketHistory {

}

export function fetchNext() {
    return api.get<Card>('/pocket', {
      headers: authHeader(),
    });
}

export function onePocket(id: number) {
  return api.get<FixedLengthArray<[CardInPocket, Array<PocketHistory>]>>('/pocket/' + id, {
    headers: authHeader(),
  });
}

export function AddCardToPocket(data: any) {
  return api.post<CardInPocket>(`/pocket`, data,  {
    headers: authHeader(),
  });
}

export function SubmitAnswer(id: number, data: any) {
  return api.post(`/pocket/${id}`, data,  {
    headers: authHeader(),
  });
}