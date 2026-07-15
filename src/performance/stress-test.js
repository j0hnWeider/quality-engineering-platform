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
    http_req_duration: ['p(95)<2000'],
  },
};

export default function () {
  const res = http.get('https://www.saucedemo.com');
  check(res, {
    'status é 200': (r) => r.status === 200,
    'tempo de resposta < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}