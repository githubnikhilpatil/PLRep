
import http from 'k6/http';
import { check, sleep } from 'k6';
import type { Options } from 'k6/options';

// @ts-ignore - k6 loads this remote module at runtime
import { htmlReport } from
    'https://raw.githubusercontent.com/benc-uk/k6-reporter/3.0.4/dist/bundle.js';

const BASE_URL = 'https://ui.freecrm.com/login';    

export const options: Options = {
    vus: 10,
    duration: '30s',

    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function (): void {
 
    const response = http.get(BASE_URL);

    check(response, {
        'status is 200': (r) => r.status === 200,
        'response time below 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
}

export function handleSummary(data: unknown): Record<string, string> {
    return {
        'performance/dist/performance-report.html': htmlReport(data, {
            title: 'CRM Performance Test Report',
            theme: 'default',
        }),
        'performance/dist/performance-summary.json':
            JSON.stringify(data, null, 2),
    };
}
