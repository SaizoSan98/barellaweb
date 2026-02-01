# BARELLA Weboldal Fejlesztési Útiterv (Roadmap)

Ez a dokumentum a projekt tervezett továbbfejlesztési lépéseit tartalmazza a "Go Live" (élesítés) utáni időszakra.

## 📅 Fázis 1: Tartalom Bővítés és SEO (Azonnali)
A technikai alapok készen állnak, a fókusz most a tartalomfeltöltésen és a keresőmotor-optimalizáláson van.

- [ ] **Blog Tartalom:** Legalább 3-5 szakmai cikk megírása és feltöltése a `blogData` fájlba.
  - *Témák:* Klímatisztítás fontossága, Padlófűtés vs. Radiátor, Energiahatékonysági tippek.
- [ ] **Referencia Projektek:** További 3-4 friss munka feltöltése nagy felbontású képekkel.
- [ ] **Metaadatok Finomhangolása:** Minden oldalhoz egyedi `title` és `description` beállítása a `generateMetadata` függvénnyel.
- [ ] **Sitemap és Robots.txt:** `sitemap.xml` és `robots.txt` generálása a Google indexelés segítésére.

## 📅 Fázis 2: Funkcionális Bővítések (Rövid táv)
A felhasználói interakciók és az adminisztráció egyszerűsítése.

- [ ] **Kapcsolat Űrlap Backend:**
  - Email küldés integrációja (pl. EmailJS vagy Nodemailer + API Route).
  - Visszajelzés a felhasználónak (Sikeres küldés / Hibaüzenet).
- [ ] **Keresés és Szűrés:**
  - Referenciák szűrése kategória szerint (pl. Lakossági, Ipari).
  - Keresőmező a blogbejegyzésekhez.
- [ ] **Cookie Consent:** GDPR kompatibilis süti elfogadó sáv beépítése (amennyiben használunk analitikát).

## 📅 Fázis 3: Teljesítmény és Mérés (Közép táv)
Az oldal hatékonyságának növelése adatok alapján.

- [ ] **Google Analytics / Vercel Analytics:** Látogatói statisztikák bekötése.
- [ ] **Sebesség Optimalizálás:**
  - Képek további optimalizálása (WebP formátum kényszerítése).
  - Bundle size elemzés és csökkentés.
- [ ] **Social Media Integráció:** Megosztás gombok a blogbejegyzésekhez (Facebook, LinkedIn).

## 📅 Fázis 4: Adminisztráció (Hosszú táv)
Ha a tartalom mennyisége indokolja, érdemes leválni a statikus fájlokról (`data.ts`).

- [ ] **Headless CMS Bevezetése:** (pl. Sanity, Contentful vagy Strapi)
  - Lehetővé teszi, hogy az ügyfél programozói tudás nélkül töltsön fel új cikkeket és referenciákat.
  - Képek kezelése felhőben.

---

## 💡 Karbantartási Feladatok
- Havi rendszerességgel függőségek frissítése (`npm update`).
- Biztonsági mentés a tartalomról (ha CMS-re váltunk).
- Böngésző kompatibilitás ellenőrzése új verziók megjelenésekor.
