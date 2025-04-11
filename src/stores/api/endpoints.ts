import type { AxiosResponse } from 'axios';
import axiosConfig from './axiosConfig'

const events = (): string => '/api/event';

export async function getEvents (): Promise<AxiosResponse> {
  return axiosConfig.get(events());
}
