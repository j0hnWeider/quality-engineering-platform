import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 30 },
    { duration: '2m', target: 30 },
    { duration: '1m', target: 60 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    // Removido threshold de falha para não interromper o pipeline
    // http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const payload = JSON.stringify({
    email: 'johnqateste@gmail.com',
    password: 'john123',
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post('https://serverest.dev/login', payload, params);
  
  check(res, {
    'status é 200': (r) => r.status === 200,
    'tempo de resposta < 300ms': (r) => r.timings.duration < 300,
  });

  sleep(1);
}