import axios from 'axios';
import { url } from '@/config';

export async function generateTokenUuid(payload: { uuid: string }) {
  return await axios
    .post(`${url}api/auth/login`, payload)
    .then((data) => data.data);
}
