import axios from 'axios';

export async function generateTokenUuid(payload: { uuid: string }) {
  return await axios
    .post(`http://localhost:4000/api/auth/login`, payload)
    .then((data) => {
      return data.data;
    });
}
