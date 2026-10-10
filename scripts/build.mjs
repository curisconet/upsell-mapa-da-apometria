import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
await mkdir(path.join(output, 'assets/fonts'), { recursive: true });
const variants = [
  { pages: ['index.html', 'downsell.html'], css: 'styles.css', script: 'script.js', prefix: 'script' },
  { pages: ['upsell-v2.html'], css: 'styles-upsell-v2.css', script: 'script-upsell-v2.js', prefix: 'script-upsell-v2' }
];
for (const variant of variants) {
  const css = (await readFile(path.join(root, variant.css), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
  const script = await readFile(path.join(root, variant.script));
  const hash = createHash('sha256').update(script).digest('hex').slice(0, 10);
  const scriptName = variant.prefix + '-' + hash + '.js';
  await writeFile(path.join(output, scriptName), script);
  for (const page of variant.pages) {
    const source = await readFile(path.join(root, page), 'utf8');
    const html = source.replace(/<link rel="stylesheet" href="[^"]+">/, '<style>' + css + '</style>')
      .replace('src="' + variant.script + '"', 'src="' + scriptName + '"');
    await writeFile(path.join(output, page), html);
  }
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
