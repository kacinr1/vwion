// Extrait un poster (1re image nette) de chaque vidéo de polissage → public/posters/<id>.jpg
// Les vidéos sont hébergées sur le CDN artlist ; ffmpeg lit l'URL distante.
// Usage : node scripts/extract-posters.mjs
import { readFileSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(path.join(root, 'src/components/PolissageHero.tsx'), 'utf8');

// Récupère chaque bloc { id: '...', ... videoUrl: '...' }
const ids = [...src.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);
const urls = [...src.matchAll(/videoUrl:\s*\n?\s*'([^']+)'/g)].map(m => m[1]);
if (ids.length !== urls.length || !urls.length) {
  console.error(`Parse KO : ${ids.length} ids / ${urls.length} urls`); process.exit(1);
}

const outDir = path.join(root, 'public/posters');
mkdirSync(outDir, { recursive: true });

for (let i = 0; i < urls.length; i++) {
  const out = path.join(outDir, `${ids[i]}.jpg`);
  // frame à ~1.5 s, largeur 1280, qualité jpeg raisonnable
  const args = ['-y', '-ss', '1.5', '-i', urls[i], '-frames:v', '1',
    '-vf', 'scale=1280:-2', '-q:v', '4', out];
  const r = spawnSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'pipe'] });
  if (r.status !== 0) {
    console.error(`ffmpeg KO pour ${ids[i]} :`, String(r.stderr).split('\n').slice(-4).join('\n'));
    process.exit(1);
  }
  console.log('poster ->', path.relative(root, out));
}
console.log('OK', urls.length, 'posters');
