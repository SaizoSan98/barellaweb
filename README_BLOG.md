# Blog Rendszer - BARELLA

## Telepítés lépései

### 1. Neon DB létrehozása
1. Regisztrálj: https://neon.tech
2. Hozz létre egy új project-et
3. Készíts egy új database-t
4. Másold ki a connection string-et (DATABASE_URL)

### 2. Környezeti változók beállítása
Másold az `.env.example` fájlt `.env` néven és töltsd ki:

```env
DATABASE_URL="postgresql://..."  # Neon connection string
ADMIN_PASSWORD="titkos-jelszo"    # Admin belépéshez
ADMIN_SECRET="random-string-123"   # Session titkosításhoz
```

### 3. Adatbázis séma létrehozása
```bash
npx drizzle-kit push:pg
```

### 4. Vercel Blob beállítása (képekhez)
1. https://vercel.com/dashboard/stores
2. Hozz létre egy Blob store-t
3. Másold ki a token-t és add hozzá az env-hez:
```env
BLOB_READ_WRITE_TOKEN="vercel_blob_token_xxx"
```

## Használat

### Admin felület
- URL: `/admin`
- Bejelentkezés: Jelszó megadása (amit az ADMIN_PASSWORD-ban állítottál)

### Funkciók
- Új blog bejegyzés létrehozása
- Cím, alcím, slug megadása
- Markdown formátumú tartalom szerkesztése
- Kép feltöltés (drag & drop vagy file picker)
- Publikálás/vázlat állapot
- Szerkesztés és törlés

### Blog megjelenés
- Lista oldal: `/cikkek`
- Részletes oldal: `/cikkek/[slug]`
- Automatikus SEO meta tag-ek
- Reszponzív design

## Markdown támogatás
A tartalomban használható:
- `# Címsor` - nagy cím
- `## Alcím` - középső cím
- `### Kiscím` - kis cím
- `**félkövér**` - félkövér szöveg
- `*dőlt*` - dőlt szöveg
- `- lista elem` - listák
