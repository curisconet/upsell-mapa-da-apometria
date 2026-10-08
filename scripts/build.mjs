import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
await mkdir(path.join(output, 'assets/fonts'), { recursive: true });
const css = (await readFile(path.join(root, 'styles.css'), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
const script = await readFile(path.join(root, 'script.js'));
const hash = createHash('sha256').update(script).digest('hex').slice(0, 10);
const scriptName = `script-${hash}.js`;
await writeFile(path.join(output, scriptName), script);
for (const page of ['index.html', 'downsell.html']) {
  const html = (await readFile(path.join(root, page), 'utf8'))
    .replace(/<link rel="stylesheet" href="styles\.css[^\"]*">/, `<style>${css}</style>`)
    .replace('src="script.js"', `src="${scriptName}"`);
  await writeFile(path.join(output, page), html);
}
for (const entry of await readdir(path.join(root, 'assets'))) {
  if (/-[a-f0-9]{10}\.webp$/.test(entry) || entry === 'favicon.svg') {
    await copyFile(path.join(root, 'assets', entry), path.join(output, 'assets', entry));
  }
}
for (const entry of await readdir(path.join(root, 'assets/fonts'))) {
  if (/\.(woff2|txt)$/.test(entry)) await copyFile(path.join(root, 'assets/fonts', entry), path.join(output, 'assets/fonts', entry));
}
console.log('Upsell e downsell preparados em dist, com CSS inline e imagens WebP.');
