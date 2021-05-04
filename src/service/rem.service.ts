import axios, { AxiosRequestConfig } from 'axios';
import { Rem } from '@/types/rem.type';

export async function setToke(token: string) {
  axios.defaults.headers.common = { 'authorization': `Bearer ${token}` };
}

export async function getRems(options?: AxiosRequestConfig) {
  return await axios.get(`http://localhost:4000/api/rem?`, { ...options });
}

export async function addRem(payload: Rem, options?: AxiosRequestConfig) {
  return await axios.post(`http://localhost:4000/api/rem/`, payload, { ...options }).then(data => data.data);
}

export async function updateRem(payload: Rem, options?: AxiosRequestConfig) {
  return await axios.patch(
    `http://localhost:4000/api/rem/${payload.id}`,
    payload,
    { ...options },
  );
}
