"""Generate responsive WebP derivatives without changing the source PNG files."""
from pathlib import Path
from PIL import Image
import hashlib
import json

root = Path(__file__).resolve().parent.parent
assets = root / 'assets'
manifest = {}
for source in sorted(assets.glob('*.png')):
    if source.stem.startswith('manual-'):
        widths, quality = (240, 480, 690), 84
    elif source.stem.startswith('pagina-'):
        widths, quality = (360, 640, 960, 1200), 88
    elif source.stem == 'colecao-apometria':
        widths, quality = (480, 768, 1280), 85
    else:
        continue
    entries = []
    with Image.open(source) as original:
        for width in widths:
            resized = original.convert('RGB').resize((width, round(original.height * width / original.width)), Image.Resampling.LANCZOS)
            output = assets / f'{source.stem}-{width}.webp'
            resized.save(output, 'WEBP', quality=quality, method=6)
            digest = hashlib.sha256(output.read_bytes()).hexdigest()[:10]
            hashed = output.with_name(f'{source.stem}-{width}-{digest}.webp')
            output.replace(hashed)
            entries.append({'width': width, 'path': 'assets/' + hashed.name, 'bytes': hashed.stat().st_size})
    manifest[source.stem] = {'originalBytes': source.stat().st_size, 'variants': entries}
(root / 'scripts/image-manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
print(json.dumps({'originalBytes': sum(v['originalBytes'] for v in manifest.values()), 'largestWebpBytes': sum(v['variants'][-1]['bytes'] for v in manifest.values())}))
