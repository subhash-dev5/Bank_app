import express from 'express';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const routes = ['/', '/index.html', ...['real-estate-financing', 'salary-financing', 'project-financing', 'open-bank-account', 'personal-loan'].map(slug => `/services/${slug}.html`)];

export async function createApp({ production = false } = {}) {
  if (process.env.NODE_ENV !== 'test') process.env.NODE_ENV = production ? 'production' : 'development';
  const app = express();
  app.disable('x-powered-by');
  app.get('/api/health', (_req, res) => res.json({ status: 'ok', mode: 'client-review-mock' }));
  // The mock deliberately has no form endpoint, request body parser or database.
  app.use((req, res, next) => {
    if (!['GET', 'HEAD'].includes(req.method)) return res.status(405).json({ error: 'Review mock: submissions are disabled.' });
    next();
  });
  let vite;
  if (!production) {
    const { createServer } = await import('vite');
    vite = await createServer({ root: directory, server: { middlewareMode: true }, appType: 'custom' });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(directory, 'dist'), { index: false }));
  }
  app.get(routes, async (req, res, next) => {
    try {
      let template = await readFile(path.join(directory, production ? 'dist/index.html' : 'index.html'), 'utf8');
      if (vite) template = await vite.transformIndexHtml(req.originalUrl, template);
      res.type('html').send(template);
    } catch (error) { vite?.ssrFixStacktrace(error); next(error); }
  });
  app.use((_req, res) => res.status(404).type('text').send('Page not found. Return to / to explore Al Shahin.'));
  return { app, close: () => vite?.close() };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT || 3000);
  const { app, close } = await createApp({ production: process.argv.includes('--production') });
  const server = app.listen(port, '127.0.0.1', () => console.log(`Al Shahin React + Express: http://127.0.0.1:${port}`));
  const stop = () => server.close(async () => { await close(); process.exit(0); });
  process.on('SIGINT', stop); process.on('SIGTERM', stop);
}
