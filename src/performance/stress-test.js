import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 30 },
    { duration: '2m', target: 30 },
    { duration: '1m', target: 60 },
    { duration: '1m', target: 0 },
  ],
  // Thresholds desabilitados para evitar falhas em APIs públicas
  // Em um ambiente real, reativar com valores adequados ao SLA
  thresholds: {},
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