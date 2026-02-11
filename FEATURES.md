# BARELLA Épületgépészet - Weboldal Funkciók és Jellemzők

Ez a dokumentum részletezi a BARELLA weboldal jelenlegi funkcióit, technológiai hátterét és felhasználói élmény elemeit.

## 🚀 Technológiai Stack
- **Keretrendszer:** Next.js 16 (App Router)
- **Nyelv:** TypeScript
- **Stílus:** Tailwind CSS v4
- **Animációk:** Framer Motion & CSS Marquee
- **Ikonkészlet:** Lucide React
- **Képkezelés:** Next.js Image Optimization (SVG & WebP)
- **Hosting/Build:** Vercel kompatibilis (Static Export támogatás)

## 🌟 Fő Funkciók

### 1. Kezdőlap (Landing Page)
- **Hero Szekció:**
  - **ÚJ:** Logó integráció a főcím bal oldalán (Desktop) és középen (Mobile).
  - Dinamikus, mozgó szöveges háttér (marquee effect) "BARELLA ÉPÜLETGÉPÉSZET", "HŐSZIVATTYÚK", stb. feliratokkal.
  - Prémium "Dark Mode" esztétika neon cián (teal-400) kiemelésekkel.
  - Mobilon optimalizált animáció sebesség (2x gyorsabb a dinamikusabb hatásért).
- **Forgalmazott Márkák (ÚJ!):**
  - Automatikusan görgető (marquee) sáv a partnerek logóival.
  - SVG logók (Daikin, Mitsubishi, Panasonic, Gree, Bosch, Toshiba, Samsung, LG).
  - Interaktív hover effektek: Szürkeárnyalatosból színesre váltás és átlátszóság változás.
- **Szolgáltatások:** Kártyás elrendezésű szolgáltatás bemutató, spotlight hover effektekkel.
- **Hogyan dolgozunk? (Folyamat) (ÚJ!):**
  - Lépésről lépésre bemutatott munkafolyamat (Kapcsolatfelvétel -> Felmérés -> Tervezés -> Kivitelezés).
  - Vizuális összekötő elemek és számozott lépések.
- **Gyakori Kérdések (FAQ) (ÚJ!):**
  - Harmonika (Accordion) stílusú lenyíló kérdés-válasz szekció.
  - Kategorizált kérdések a könnyebb átláthatóságért.
- **Referenciák ízelítő:** Kiemelt projektek megjelenítése.
- **Kapcsolat űrlap & Lábléc:** Közvetlen elérhetőségek és gyorslinkek.

### 2. Referenciák Rendszer
- **Lista oldal (`/referenciak`):**
  - Grid elrendezésű projektkártyák.
  - Látványos hover animációk (kép nagyítás, overlay megjelenés).
  - Mobil-barát "MEGNYITÁS" jelvények.
- **Részletes nézet (`/referenciak/[id]`):**
  - **Hero kép:** Teljes szélességű borítókép átmenettel.
  - **Sticky Sidebar:** "Alkalmazott Technológia" doboz, amely görgetéskor rögzül, így a CTA (Ajánlatkérés) mindig látható marad.
  - **Galéria:** Nagy felbontású képek grid elrendezésben.
  - **Navigáció:** "Vissza a referenciákhoz" gomb.

### 3. Hasznos Cikkek (Blog)
- **Lista oldal (`/cikkek`):**
  - A referenciákhoz hasonló vizuális stílus, de tartalom-fókuszú elrendezéssel.
  - Kártyákon kategória, dátum és rövid bevezető (excerpt) megjelenítése.
  - "OLVASÁS" hover effektus.
- **Cikk olvasó nézet (`/cikkek/[id]`):**
  - SEO-barát struktúra (Cím, Kategória, Olvasási idő).
  - Kiemelt bevezető szöveg (lead) stílusos formázással.
  - Strukturált tartalom (szekciók címei és bekezdései).
  - Kapcsolódó témák (címkék) a sticky oldalsávban.
  - Integrált galéria támogatás a cikkekhez.

### 4. Navigáció és UI Elemek
- **Reszponzív Navbar:**
  - Görgetésre változó háttér (átlátszó -> sötét blur).
  - Aktív linkek jelölése aláhúzással.
  - Mobil menü teljes képernyős, animált megnyitással.
- **Ajánlatkérő Modál:**
  - Globálisan elérhető (Context API).
  - Minden oldalon hívható a "AJÁNLATKÉRÉS" gombokkal.
- **Scroll To Top:**
  - Automatikusan megjelenő nyíl a lap aljára érve.

## 🎨 Design és UX
- **Színvilág:** Sötét téma (Black/Dark Grey) cián (Teal-400) akcentussal. Professzionális, modern ipari hatás.
- **Interakciók:**
  - Minden interaktív elem (gomb, link, kártya) rendelkezik hover állapottal.
  - Finom belépő animációk (fade-in, slide-up) az oldal görgetésekor.
- **Teljesítmény:**
  - Képek optimalizálása `next/image` használatával.
  - "Lazy loading" a hajtás alatti tartalmakhoz.
  - Statikus generálás (SSG) a villámgyors betöltésért.

## 📱 Mobil Optimalizáció
- Teljesen reszponzív elrendezés.
- Érintésbarát méretek és gombok.
- Optimalizált animációk a kisebb kijelzőkre és alacsonyabb teljesítményű eszközökre.
