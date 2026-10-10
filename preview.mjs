import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const workspace = path.dirname(fileURLToPath(import.meta.url));
const root = process.env.PREVIEW_DIST === '1' ? path.join(workspace, 'dist') : workspace;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2' };
http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const route = pathname === '/' ? '/index.html' : ['/downsell', '/downsell/'].includes(pathname) ? '/downsell.html' : ['/upsell-v2', '/upsell-v2/'].includes(pathname) ? '/upsell-v2.html' : pathname;
    const target = path.resolve(root, '.' + route);
    const relative = path.relative(root, target);
    const publicFile = ['index.html', 'downsell.html', 'upsell-v2.html', 'styles-upsell-v2.css', 'script-upsell-v2.js', 'styles.css', 'script.js', 'assets'].includes(relative.split(path.sep)[0]) || /^script-(?:upsell-v2-)?[a-f0-9]{10}\.js$/.test(relative);
    if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(path.sep).some(part => part.startsWith('.')) || !publicFile) {
      response.writeHead(403).end('Forbidden'); return;
    }
    const body = await readFile(target);
    response.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream' });
    response.end(body);
  } catch { response.writeHead(404).end('Not found'); }
}).listen(Number(process.env.PORT || 3000), '127.0.0.1', () => console.log(`Prévia: http://127.0.0.1:${process.env.PORT || 3000}`));
