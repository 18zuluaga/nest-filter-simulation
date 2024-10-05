import axios from 'axios';

const mercadoPagoApi = axios.create({
  baseURL: 'https://api.mercadopago.com/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `TEST-1823601205578371-100422-f0799296d7e72925b8a165a2598c1aa8-600589201`,
  },
});

export { mercadoPagoApi };
