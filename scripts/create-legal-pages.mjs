import pkg from 'pg';
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const { Client } = pkg;

// Load .env manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
try {
  const envPath = resolve(__dirname, '..', '.env');
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m) {
      let val = m[2];
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[m[1]]) process.env[m[1]] = val;
    }
  }
} catch {}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const DEFAULT_PRIVACY = `# Adatvédelmi tájékoztató

## 1. Az adatkezelő adatai

BARELLA Épületgépészet
E-mail: barella.gep@gmail.com
Telefon: +36 30 173 88 66

## 2. Kezelt adatok köre

Az ajánlatkérés során az alábbi adatokat kezeljük:
- Név
- E-mail cím
- Telefonszám
- Üzenet tartalma

## 3. Az adatkezelés jogalapja

Az adatkezelés jogalapja az érintett hozzájárulása (GDPR 6. cikk (1) bekezdés a) pontja), illetve szerződés teljesítése (GDPR 6. cikk (1) bekezdés b) pontja).

## 4. Az adatkezelés időtartama

Az ajánlatkéréssel kapcsolatos adatokat a megkeresés lezárását követően töröljük, kivéve, ha jogszabály hosszabb megőrzést ír elő.

## 5. Az érintett jogai

Ön jogosult:
- tájékoztatást kérni a személyes adatairól,
- kérni azok helyesbítését, törlését,
- kérni az adatkezelés korlátozását,
- tiltakozni az adatkezelés ellen,
- az adathordozhatósághoz való joggal élni.

## 6. Jogorvoslat

Panasz esetén a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH) fordulhat:
www.naih.hu`;

const DEFAULT_COOKIES = `# Süti (cookie) kezelési tájékoztató

## 1. Mi az a süti?

A süti (cookie) egy olyan kis méretű szöveges fájl, amelyet a weboldal az Ön eszközén tárol, amikor meglátogatja azt.

## 2. Milyen sütiket használunk?

### Elengedhetetlen (funkcionális) sütik
Az oldal működéséhez szükséges sütik, ezek nem kapcsolhatók ki.

### Beállítási sütik
Az Ön preferenciáit tárolják (pl. süti hozzájárulás állapota).

### Statisztikai sütik (opcionális)
Segítenek megérteni, hogyan használják az oldalt a látogatók.

## 3. Hozzájárulás

Az oldal első megnyitásakor Ön dönthet arról, hogy elfogadja-e a sütik használatát. A beállításokat bármikor módosíthatja.

## 4. Sütik törlése

A böngészőben bármikor törölheti vagy letilthatja a sütiket. Felhívjuk figyelmét, hogy ez bizonyos funkciók működését korlátozhatja.

## 5. Kapcsolat

Kérdés esetén keressen minket: barella.gep@gmail.com`;

const DEFAULT_TERMS = `# Általános Szerződési Feltételek (ÁSZF)

## 1. Szolgáltató

BARELLA Épületgépészet
E-mail: barella.gep@gmail.com
Telefon: +36 30 173 88 66
Weboldal: https://barella.hu

## 2. Általános rendelkezések

A jelen ÁSZF a Szolgáltató által nyújtott épületgépészeti, klíma, hőszivattyú, légtechnikai szolgáltatásokra vonatkozik.

## 3. Ajánlatkérés és szerződéskötés

Az ajánlatkérés a weboldalon keresztül, e-mailben vagy telefonon történhet. A szerződés a felek kölcsönös írásbeli megállapodásával jön létre.

## 4. Árak és fizetési feltételek

Az árak bruttó összegben értendők, tartalmazzák az ÁFÁT. A konkrét árajánlat egyedi igények alapján készül.

## 5. Teljesítés

A Szolgáltató a megrendelésben rögzített határidőn belül köteles a munkát elvégezni. Határidő-módosításról a feleknek előzetesen kell megállapodniuk.

## 6. Jótállás és szavatosság

A Szolgáltató a jogszabály szerinti jótállási és szavatossági kötelezettségeket vállalja.

## 7. Felmondás

A szerződés a felek közös megegyezésével írásban bármikor módosítható vagy megszüntethető.

## 8. Panaszkezelés

Panasszal a Szolgáltató elérhetőségein lehet élni. A Szolgáltató minden panaszt a vonatkozó jogszabályok szerint kivizsgál.

## 9. Vitás kérdések

A felek a vitás kérdéseket elsősorban egyeztetéssel kísérlik meg rendezni.`;

const DEFAULTS = [
  { slug: 'adatvedelem', title: 'Adatvédelmi tájékoztató', content: DEFAULT_PRIVACY },
  { slug: 'suti-kezeles', title: 'Süti kezelési tájékoztató', content: DEFAULT_COOKIES },
  { slug: 'aszf', title: 'Általános Szerződési Feltételek', content: DEFAULT_TERMS },
];

const client = new Client({ connectionString: databaseUrl });

async function run() {
  try {
    await client.connect();
    console.log('Connected to database');

    await client.query(`
      CREATE TABLE IF NOT EXISTS legal_pages (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(100) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('legal_pages table ensured');

    for (const page of DEFAULTS) {
      const existing = await client.query('SELECT id FROM legal_pages WHERE slug = $1', [page.slug]);
      if (existing.rows.length === 0) {
        await client.query(
          'INSERT INTO legal_pages (slug, title, content) VALUES ($1, $2, $3)',
          [page.slug, page.title, page.content]
        );
        console.log(`Inserted default: ${page.slug}`);
      } else {
        console.log(`Already exists: ${page.slug}`);
      }
    }

    console.log('Done.');
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
