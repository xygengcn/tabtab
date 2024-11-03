import Api from 'koa-api-plus';
import path from 'path';

const api = new Api({ baseUrl: path.join(__dirname, './controllers'), port: 30000 });

api.on('http', (...args) => {
  console.log('[http]', ...args);
});

api.on('log', (...args) => {
  console.log('[log]', ...args);
});

api.on('start', () => {
  console.log('[start]');
});

api.on('error', (e) => {
  console.error('[error]', e);
});

api.start();
