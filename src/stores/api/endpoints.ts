import type { AxiosResponse } from 'axios';
import axiosConfig from './axiosConfig'

const events = (): string => '/api/event';
const event = (eventId: string): string => `/api/event/${eventId}`;

export async function getEvents (): Promise<AxiosResponse> {
  return axiosConfig.get(events());
}

export async function getEvent (eventId: string): Promise<AxiosResponse> {
  return axiosConfig.get(event(eventId));
}
