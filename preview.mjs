import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const route = pathname === '/' ? '/index.html' : ['/downsell', '/downsell/'].includes(pathname) ? '/downsell.html' : pathname;
    const target = path.resolve(root, '.' + route);
    const relative = path.relative(root, target);
    if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(path.sep).some(part => part.startsWith('.')) || !['index.html', 'downsell.html', 'styles.css', 'script.js', 'assets'].includes(relative.split(path.sep)[0])) {
      response.writeHead(403).end('Forbidden'); return;
    }
    const body = await readFile(target);
    response.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream' });
    response.end(body);
  } catch { response.writeHead(404).end('Not found'); }
}).listen(3000, '127.0.0.1', () => console.log('Prévia: http://127.0.0.1:3000'));
