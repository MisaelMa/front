import axios, { AxiosRequestConfig } from 'axios';
import { Rem } from '@/types/rem.type';
import { url } from '@/config';

export async function setToke(token: string) {
  axios.defaults.headers.common = { 'authorization': `Bearer ${token}` };
}

export async function getRems(options?: AxiosRequestConfig) {
  return await axios.get(`${url}/api/rem?`, { ...options });
}

export async function addRem(payload: Rem, options?: AxiosRequestConfig) {
  return await axios.post(`${url}/api/rem/`, payload, { ...options }).then(data => data.data);
}

export async function updateRem(payload: Rem, options?: AxiosRequestConfig) {
  return await axios.patch(
    `${url}/api/rem/${payload.id}`,
    payload,
    { ...options },
  );
}
