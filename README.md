# Platformă Integrată de Marketing Digital și Analiză a Performanței Campaniilor Social Media pentru Branduri de Modă

**Academia de Studii Economice din București**
**Facultatea de Cibernetică, Statistică și Informatică Economică**
**Master SIMPRE**

**Student:** Cernica Sergiu-Rareș
**Coordonator:** [Numele coordonatorului]
**Sesiunea:** Iulie 2026

---

> Acest document reprezintă **cuprinsul orientativ și schița de conținut** al lucrării de disertație.
> Documentul final va fi redactat în Microsoft Word conform cerințelor formale.

---

## Resurse proiect

- **Aplicație:** https://thenecessaryproject.onrender.com/
- **Repository GitHub:** https://github.com/[username]/TheNecessaryProject
- **Demo video:** [link demo]

---

## CUPRINS ORIENTATIV

```
Introducere ......................................................... 1
1. Descrierea problemei economice ................................... 3
   1.1. Prezentarea organizației și a domeniului abordat ............ 3
   1.2. Activitatea care face obiectul informatizării ............... 6
   1.3. Analiza comparativă cu soluții software existente ........... 9
2. Analiza și proiectarea sistemului informațional .................. 13
   2.1. Specificarea cerințelor sistemului informatic ............... 13
   2.2. Analiza sistemului existent ................................ 18
   2.3. Proiectarea noului sistem .................................. 23
3. Implementarea aplicației informatice ............................ 35
   3.1. Prezentarea tehnologiilor utilizate ........................ 35
   3.2. Implementarea aplicației .................................. 41
   3.3. Prezentarea funcționalităților platformei .................. 47
Concluzii .......................................................... 55
Bibliografie ....................................................... 57
Anexe .............................................................. 59
```

---

## INTRODUCERE (1–2 pag.)

**Ce se argumentează în introducere:**

Peisajul marketingului digital a suferit o transformare profundă în ultimii ani: brandurile nu mai pot evalua eficiența campaniilor social media prin simple metrici de vanitate (număr de like-uri, followeri), ci au nevoie de instrumente care să coreleze direct activitatea din rețelele sociale cu rezultatele comerciale concrete — comenzi plasate, venituri generate, rata de conversie.

Lucrarea de față propune o platformă software care răspunde acestei nevoi prin integrarea mai multor straturi tehnologice: un motor de comerț electronic funcțional, un sistem de generare automată de conținut bazat pe inteligență artificială (Google Gemini API), un modul de tracking al campaniilor social media cu atribuire a conversiilor și un dashboard analitic în timp real. Totodată, platforma realizează sincronizarea cu Instagram Business API (Meta Graph API) pentru colectarea automată a metricilor organice de engagement.

Motivația cercetării derivă din absența unor soluții integrate, accesibile financiar pentru brandurile mici și medii, care să combine simultan: generarea de conținut AI, urmărirea conversiilor din social media și vizualizarea ROI-ului per campanie, fără a necesita abonamente la multiple platforme specializate.

**Cuvinte cheie:** marketing digital, analytics, social media, inteligență artificială, e-commerce, MERN stack, Meta Graph API, Google Gemini, campanie, conversie, ROI.

---

## CAPITOLUL 1 — DESCRIEREA PROBLEMEI ECONOMICE (~10 pag.)

### 1.1. Prezentarea organizației și a domeniului abordat (~3 pag.)

**Conținut recomandat:**

**Brandul TheNecessary** este o societate comercială cu activitate exclusiv online în domeniul modei masculine, fondată cu scopul de a oferi articole vestimentare cu design minimalist la un raport calitate-preț competitiv. Distribuția se realizează integral prin intermediul platformei proprii, fără prezență în retail fizic.

Contextul economic în care activează brandul se caracterizează printr-o creștere accelerată a comerțului electronic la nivel european și național. Conform datelor Eurostat, piața de e-commerce din România a înregistrat o creștere anuală de peste 20% în perioada 2022–2024, iar sectorul modei online reprezintă una dintre categoriile cu cel mai ridicat potențial de expansiune.

Particularitatea acestui domeniu constă în dependența tot mai accentuată față de canalele social media ca instrument principal de achiziție a clienților. Platforme precum Instagram, TikTok sau YouTube sunt utilizate nu doar ca vitrine de prezentare, ci ca vectori direcți de trafic comercial, iar măsurarea eficienței acestor canale devine o necesitate operațională.

**Se va descrie:**
- Structura companiei, piața-țintă, categorii de produse
- Poziționarea brandului în peisajul competitiv al modei online
- Importanța canalelor digitale pentru modelul de business adoptat
- Dependența de social media ca principal canal de marketing și provocările de măsurare a ROI-ului aferent

### 1.2. Activitatea care face obiectul informatizării (~4 pag.)

**Conținut recomandat:**

Activitatea supusă informatizării este **managementul integrat al campaniilor de marketing pe rețele sociale**, o funcție critică a oricărui brand contemporan de e-commerce, care în prezent se desfășoară fragmentat și fără instrumente dedicate de măsurare.

Procesul curent (neautomatizat) implică:
1. Crearea manuală a conținutului pentru postări (texte, hashtag-uri)
2. Publicarea pe platformele sociale fără o legătură directă cu magazinul online
3. Monitorizarea separată a metricilor de engagement (Instagram Insights, TikTok Analytics)
4. Imposibilitatea corelării unui click dintr-o postare cu o comandă finalizată
5. Calculul ROI realizat manual, pe baza estimărilor

**Informatizarea vizează:**
- Automatizarea generării de conținut prin AI (caption-uri optimizate per platformă, prompturi pentru generare video)
- Crearea de URL-uri de tracking unice per campanie, care permit atribuirea precisă a vizitelor și conversiilor
- Sincronizarea automată cu Instagram Business API pentru preluarea metricilor organice
- Centralizarea datelor din toate sursele (campanii social media + trafic direct) într-un singur dashboard analitic
- Calculul automat al KPI-urilor: clicks, conversii, venituri atribuite, cost per conversie, ROI

**Se va prezenta:**
- Fluxul actual al activității de marketing (diagrama flux)
- Punctele slabe ale procesului neautomatizat
- Obiectivele măsurabile ale noii platforme
- Beneficiile anticipate: reducerea timpului de creare conținut, vizibilitate completă asupra performanței campaniilor

### 1.3. Analiza comparativă cu soluții software existente (~3 pag.)

**Conținut recomandat:**

| Criteriu | TheNecessary Platform | Hootsuite | Sprout Social | Meta Business Suite | Shopify Analytics |
|---|---|---|---|---|---|
| Generare conținut AI | ✅ Gemini 2.5 Flash | ❌ | Parțial | ❌ | ❌ |
| Tracking conversii social media | ✅ URL unic per campanie | ❌ | ❌ | Parțial (Meta only) | Parțial |
| Sincronizare Instagram API | ✅ | ✅ | ✅ | ✅ | ❌ |
| Dashboard ROI per campanie | ✅ | Parțial | ✅ | Parțial | ❌ |
| Integrare e-commerce nativă | ✅ | ❌ | ❌ | ❌ | ✅ |
| Multi-platformă | ✅ (IG, TikTok, YT, FB) | ✅ | ✅ | ❌ (Meta only) | ❌ |
| Cost | Open-source / self-hosted | $99+/lună | $249+/lună | Gratuit (limitat) | Inclus Shopify |
| Prompturi generare video (AI) | ✅ Runway ML | ❌ | ❌ | ❌ | ❌ |

**Concluzie comparativă:** Niciuna dintre soluțiile analizate nu oferă simultan generarea de conținut AI, tracking-ul conversiilor din social media și calculul ROI în cadrul aceleiași platforme integrate cu un motor de e-commerce. Valoarea adăugată a soluției propuse constă tocmai în această integrare verticală, care elimină necesitatea utilizării simultane a 3–4 instrumente separate.

---

## CAPITOLUL 2 — ANALIZA ȘI PROIECTAREA SISTEMULUI INFORMAȚIONAL (~20 pag.)

### 2.1. Specificarea cerințelor sistemului informatic (~5 pag.)

**Cerințe funcționale:**

**Modul E-commerce (baza sistemului):**
- RF01: Vizualizarea catalogului de produse cu paginare și filtrare după cuvânt cheie
- RF02: Gestionarea coșului de cumpărături cu persistență în localStorage
- RF03: Fluxul de checkout în trei pași: adresă livrare → metodă plată → confirmare
- RF04: Integrarea cu PayPal SDK pentru procesarea plăților online
- RF05: Urmărirea comenzilor (stare: plasată / plătită / livrată) pentru client și admin
- RF06: Sistem de recenzii cu rating per produs (o recenzie per utilizator per produs)
- RF07: Panel admin: CRUD produse, gestionare utilizatori, gestionare comenzi

**Modul Marketing Analytics (contribuția disertației):**
- RF08: Crearea campaniilor social media cu selecție produs, platformă, nișă, stil conținut
- RF09: Generarea automată de caption și prompt video prin Google Gemini 2.5 Flash API
- RF10: Generarea URL-ului de tracking unic (bazat pe campaignId UUID) per campanie
- RF11: Înregistrarea click-urilor la accesarea URL-ului de tracking
- RF12: Atribuirea conversiilor (comenzilor plătite) campaniei sursă prin sesiune
- RF13: Sincronizarea automată a metricilor organice Instagram (views, likes, shares, saved) prin Meta Graph API
- RF14: Asocierea unui post Instagram publicat cu campania corespunzătoare prin URL
- RF15: Dashboard analitic cu KPI-uri agregate: clicks totale, conversii, venituri, rată conversie, ROI
- RF16: Filtrarea datelor din dashboard după interval de timp (preset-uri sau interval personalizat)
- RF17: Vizualizarea grafică a performanței per platformă (bar chart venituri, pie chart atribuire)
- RF18: Urmărirea traficului direct (vizite și conversii fără link de campanie)

**Cerințe non-funcționale:**
- RNF01: Timp de răspuns API sub 500ms pentru operații CRUD standard
- RNF02: Autentificare JWT cu token stocat în cookie HTTP-only (prevenire XSS)
- RNF03: Separarea rolurilor utilizator/admin la nivel de middleware
- RNF04: Interfață responsive, utilizabilă pe mobil și desktop
- RNF05: Disponibilitate 99%+ prin deployment pe platformă cloud (Render)
- RNF06: Scalabilitate verticală prin MongoDB Atlas (cloud database)

### 2.2. Analiza sistemului existent (~5 pag.)

**Conținut recomandat:**

**Diagrama cazurilor de utilizare (Use Case Diagram):**

Actori:
- **Vizitator** (neautentificat): browsing produse, înregistrare cont, accesare URL tracking campanie
- **Client** (autentificat): toate drepturile vizitatorului + plasare comenzi, plată PayPal, vizualizare profil și istoric
- **Administrator**: toate drepturile clientului + panel admin complet, creare campanii, generare conținut AI, vizualizare dashboard analytics, trigger sync Instagram

**Cazuri de utilizare principale:**

*Flux client:*
- UC01: Căutare și filtrare produse
- UC02: Vizualizare detalii produs + recenzii
- UC03: Adăugare în coș și modificare cantități
- UC04: Checkout (adresă → plată → confirmare)
- UC05: Plată prin PayPal
- UC06: Urmărire stare comandă
- UC07: Adăugare recenzie produs

*Flux administrator:*
- UC08: Creare/editare/ștergere produse
- UC09: Gestionare utilizatori și roluri
- UC10: Marcare comenzi ca livrate
- UC11: Creare campanie social media (AI-assisted)
- UC12: Generare caption + prompt video Runway ML prin Gemini API
- UC13: Obținere URL de tracking per campanie
- UC14: Asociere post Instagram la campanie
- UC15: Triggering sincronizare Instagram Business API
- UC16: Vizualizare dashboard analytics cu filtrare temporală

**Diagrama de stare a campaniei:**
```
[Nouă] → [Conținut generat] → [Campanie creată / URL obținut] → [Post asociat] → [Sincronizată]
                                       ↓                              ↓
                               [Clicks înregistrate]         [Metrics actualizate]
                                       ↓
                               [Conversii atribuite]
```

### 2.3. Proiectarea noului sistem (~10 pag.)

#### 2.3.1. Arhitectura generală

Platforma adoptă arhitectura **MERN Stack** (MongoDB, Express.js, React.js, Node.js) cu separare clară între client (frontend) și server (backend), comunicare prin API REST și deployment cloud pe Render cu baza de date gestionată prin MongoDB Atlas.

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (React SPA)                    │
│  Redux Store │ RTK Query │ React Router │ React Bootstrap│
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS / REST API
┌──────────────────────▼──────────────────────────────────┐
│                 SERVER (Node.js + Express)               │
│  JWT Middleware │ Routes │ Controllers │ AsyncHandler    │
└──────┬──────────────────────────┬──────────────────────-┘
       │                          │
┌──────▼──────┐         ┌─────────▼──────────────────────┐
│  MongoDB    │         │      API-uri externe             │
│  Atlas      │         │  • PayPal SDK                   │
│  (cloud)    │         │  • Google Gemini 2.5 Flash API  │
└─────────────┘         │  • Meta Graph API v19.0         │
                        └────────────────────────────────-┘
```

#### 2.3.2. Proiectarea bazei de date

**Colecția Users:**
```
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (bcrypt hash),
  isAdmin: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

**Colecția Products:**
```
{
  _id: ObjectId,
  user: ObjectId → Users,
  name: String,
  image: String,
  description: String,
  brand: String,
  category: String,
  price: Number,
  countInStock: Number,
  rating: Number,
  numReviews: Number,
  reviews: [{ name, rating, comment, user → Users }],
  createdAt, updatedAt
}
```

**Colecția Orders:**
```
{
  _id: ObjectId,
  user: ObjectId → Users,
  orderItems: [{ name, qty, image, price, product → Products }],
  shippingAddress: { address, city, postalCode, country },
  paymentMethod: String,
  paymentResult: { id, status, update_time, email_address },
  taxPrice, shippingPrice, totalPrice: Number,
  isPaid: Boolean, paidAt: Date,
  isDelivered: Boolean, deliveredAt: Date,
  createdAt, updatedAt
}
```

**Colecția Analytics** *(nouă — contribuție disertație):*
```
{
  _id: ObjectId,
  campaignId: String (UUID, unique) — folosit în URL tracking,
  source: Enum['Instagram','TikTok','YouTube','Facebook'],
  niche: String,
  contentStyle: String,
  postId: String — shortcode Instagram pentru sincronizare API,
  product: ObjectId → Products,
  clicks: Number,
  conversions: Number,
  totalRevenue: Number,
  cost: Number,
  views: Number,       ← sincronizat din Instagram API
  likes: Number,       ← sincronizat din Instagram API
  shares: Number,      ← sincronizat din Instagram API
  saved: Number,       ← sincronizat din Instagram API
  commentCount: Number,
  createdAt, updatedAt
}
```

**Colecția SiteMetrics** *(nouă — contribuție disertație):*
```
{
  _id: 'global' (singleton),
  directVisits: Number,
  directConversions: Number,
  directRevenue: Number
}
```

#### 2.3.3. Proiectarea API REST

**Resurse existente (e-commerce):**

| Metodă | Endpoint | Acces | Descriere |
|---|---|---|---|
| POST | /api/users | Public | Înregistrare utilizator |
| POST | /api/users/login | Public | Autentificare + JWT cookie |
| POST | /api/users/logout | Privat | Ștergere JWT cookie |
| GET | /api/users/profile | Privat | Profil utilizator curent |
| PUT | /api/users/profile | Privat | Actualizare profil |
| GET | /api/users | Admin | Listă utilizatori (paginat) |
| GET | /api/products | Public | Listă produse (paginat, filtrat) |
| GET | /api/products/:id | Public | Detalii produs |
| POST | /api/products | Admin | Creare produs |
| PUT | /api/products/:id | Admin | Actualizare produs |
| DELETE | /api/products/:id | Admin | Ștergere produs |
| POST | /api/products/:id/reviews | Privat | Adăugare recenzie |
| POST | /api/orders | Privat | Plasare comandă |
| GET | /api/orders/myorders | Privat | Comenzile utilizatorului |
| GET | /api/orders/:id | Privat/Admin | Detalii comandă |
| PUT | /api/orders/:id/pay | Privat | Marcare plătită (PayPal) |
| PUT | /api/orders/:id/deliver | Admin | Marcare livrată |

**Resurse noi — Marketing Analytics** *(contribuție disertație):*

| Metodă | Endpoint | Acces | Descriere |
|---|---|---|---|
| GET | /api/analytics | Admin | Dashboard KPI (cu filtrare dată) |
| POST | /api/analytics | Admin | Creare înregistrare campanie |
| POST | /api/analytics/generate | Admin | Generare conținut AI (Gemini) |
| POST | /api/analytics/sync | Admin | Trigger sincronizare Instagram API |
| POST | /api/analytics/direct-visit | Public | Înregistrare vizită directă |
| POST | /api/analytics/direct-convert | Privat | Înregistrare conversie directă |
| PUT | /api/analytics/:campaignId/click | Public | Înregistrare click din tracking URL |
| PUT | /api/analytics/:campaignId/convert | Privat | Înregistrare conversie din campanie |
| PUT | /api/analytics/:campaignId/post | Admin | Asociere URL post Instagram |

#### 2.3.4. Proiectarea mecanismului de tracking și atribuire

**Fluxul de atribuire a conversiilor:**

```
Utilizator accesează URL tracking:
/?social_analytics_id=<campaignId>
        ↓
Frontend detectează parametru → stochează campaignId în sessionStorage
        ↓
Backend: PUT /api/analytics/<campaignId>/click → clicks += 1
        ↓
Utilizatorul plasează comandă → orderController verifică sessionStorage
        ↓
PUT /api/analytics/<campaignId>/convert → conversions += 1, revenue += totalPrice
        ↓
sessionStorage cleared (atribuire single-touch)
```

**Fluxul de sincronizare Instagram:**

```
Admin apasă "Sync Instagram"
        ↓
POST /api/analytics/sync → instagramScraper.js
        ↓
GET https://graph.facebook.com/v19.0/<ACCOUNT_ID>/media
    ?fields=id,permalink,like_count,comments_count,reach,shares,saved
        ↓
Pentru fiecare media: extragere shortcode din permalink
        ↓
Analytics.findOneAndUpdate({ postId: shortcode }) → actualizare views/likes/shares/saved
        ↓
Răspuns: { updated: N }
```

#### 2.3.5. Diagrame de secvență

**Se vor realiza diagrame de secvență UML pentru:**
1. Fluxul de autentificare (login cu JWT)
2. Fluxul de plasare comandă (checkout → PayPal → confirmare)
3. Fluxul de creare campanie cu AI (selectare produs → Gemini API → URL tracking)
4. Fluxul de sincronizare Instagram (trigger admin → Meta API → actualizare DB)
5. Fluxul de tracking conversie (click URL → sessionStorage → checkout → atribuire)

---

## CAPITOLUL 3 — IMPLEMENTAREA APLICAȚIEI INFORMATICE (~10 pag.)

### 3.1. Prezentarea tehnologiilor utilizate (~6 pag.)

#### Backend

**Node.js v18+**
Mediu de execuție JavaScript server-side, bazat pe motorul V8, ce permite construirea de servere web cu performanță ridicată și model non-blocking I/O. A fost ales pentru compatibilitatea nativă cu formatul JSON utilizat de MongoDB și pentru ecosistemul npm.

**Express.js v4**
Framework web minimalist pentru Node.js, utilizat pentru definirea rutelor REST, aplicarea middleware-urilor (autentificare, gestionare erori) și servirea conținutului static. Arhitectura controller-route-middleware asigură separarea responsabilităților.

**MongoDB + Mongoose**
MongoDB este o bază de date NoSQL orientată pe documente, stocând datele în format BSON (Binary JSON). Mongoose adaugă un strat ODM (Object Document Mapping) cu definirea schemelor, validări și metode de interogare. Baza de date este găzduită în cloud prin MongoDB Atlas.

**JSON Web Tokens (JWT)**
Mecanism de autentificare stateless prin token-uri semnate criptografic. Token-ul este stocat în cookie HTTP-only (inaccesibil din JavaScript) pentru a preveni atacurile XSS. Middleware-ul `protect` validează token-ul la fiecare request protejat.

**bcryptjs**
Bibliotecă pentru hashing-ul parolelor utilizând algoritmul bcrypt cu salt factor 10. Parolele nu sunt stocate niciodată în text clar.

**Google Generative AI SDK (@google/generative-ai)**
SDK oficial Google pentru accesarea API-ului Gemini. Utilizat cu modelul `gemini-2.5-flash` pentru generarea de conținut de marketing (caption-uri social media și prompturi pentru generare video prin Runway ML). Promptul este structurat ca instrucțiune expert și returnează JSON validat înainte de a fi transmis clientului.

**Meta Graph API v19.0 (Instagram Business API)**
API-ul oficial Meta pentru accesarea datelor din conturile Instagram Business. Utilizat pentru sincronizarea metricilor organice ale postărilor (reach/views, like_count, comments_count, shares, saved). Autentificarea se realizează prin Long-Lived Access Token cu permisiunile: `instagram_basic`, `instagram_manage_insights`, `pages_show_list`.

**PayPal JavaScript SDK + @paypal/paypal-js**
Integrare cu PayPal Developer API pentru procesarea plăților. În development se utilizează sandbox-ul PayPal; în producție, credențialele live.

#### Frontend

**React 18**
Bibliotecă JavaScript pentru construirea de interfețe utilizator prin componente reutilizabile și Virtual DOM. Utilizează hooks (`useState`, `useEffect`, `useRef`) pentru gestionarea stării locale.

**Redux Toolkit + RTK Query**
Redux Toolkit simplifică gestionarea stării globale prin slice-uri și reduceri standardizate. RTK Query extinde Redux cu un layer de data fetching care automatizează caching-ul, invalidarea și re-fetch-ul datelor de la API. Toate apelurile HTTP sunt centralizate în slices dedicate (`productsApiSlice`, `analyticsApiSlice` etc.).

**React Router DOM v6**
Routing client-side cu suport pentru rute protejate (`PrivateRoute`, `AdminRoute`), navigare programatică și parametri de URL.

**React Bootstrap 5**
Componentă UI bazată pe Bootstrap 5, oferind un sistem de grid responsive, componente pre-stilizate (Card, Table, Badge, Form, Button) și utilitare CSS.

**Recharts**
Bibliotecă de vizualizare a datelor pentru React, utilizată pentru:
- `BarChart` — comparație venituri per platformă social media
- `PieChart` — distribuția atribuirii veniturilor (campanii vs. trafic direct)

**React Toastify**
Sistem de notificări non-blocking (toast notifications) pentru feedback utilizator în urma acțiunilor (creare campanie, sync, erori API).

#### Infrastructure & Deployment

**Render (Cloud Hosting)**
Platformă PaaS (Platform as a Service) pentru deployment-ul serverului Node.js. Suportă variabile de mediu securizate, redeploy automat la push pe branch-ul main și HTTPS by default.

**MongoDB Atlas**
Serviciu cloud pentru MongoDB cu clustering, backup automat, monitorizare și scalare. Tier M0 (gratuit) suficient pentru volumul unui brand mic/mediu.

### 3.2. Implementarea aplicației (~4 pag.)

**Se vor prezenta pașii principali de implementare, ca mini-tutorial:**

**Pasul 1: Configurarea mediului**
```bash
# Clonare repository și instalare dependențe
npm install          # backend (din /backend)
cd frontend && npm install  # frontend
```

Variabile de mediu necesare (`.env`):
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=...
PAYPAL_CLIENT_ID=...
GEMINI_API_KEY=...
INSTAGRAM_ACCESS_TOKEN=...
INSTAGRAM_BUSINESS_ACCOUNT_ID=...
```

**Pasul 2: Popularea bazei de date**
```bash
npm run data:import    # inserare date de test
npm run data:destroy   # ștergere date
```

Seeder-ul inserează în ordine: Users → Products → Analytics (referențiind produsele create) → Orders (referențiind useri și produse) → SiteMetrics (singleton global).

**Pasul 3: Implementarea modulului de generare AI**

Endpoint-ul `POST /api/analytics/generate` primește parametrii campaniei, construiește un prompt structurat pentru Gemini 2.5 Flash și parsează răspunsul JSON returnat:

```javascript
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const result = await model.generateContent(prompt);
const cleaned = result.response.text().trim()
  .replace(/^```json\n?/, "").replace(/\n?```$/, "");
const content = JSON.parse(cleaned);  // { caption, videoPrompt }
```

**Pasul 4: Implementarea tracking-ului de conversii**

La accesarea unui URL de tip `/?social_analytics_id=<uuid>`:
```javascript
// frontend — index.js (useEffect)
const urlParams = new URLSearchParams(window.location.search);
const campaignId = urlParams.get("social_analytics_id");
if (campaignId) {
  sessionStorage.setItem("campaignId", campaignId);
  registerClick(campaignId);  // PUT /api/analytics/:id/click
}
```

La plasarea comenzii cu succes:
```javascript
const campaignId = sessionStorage.getItem("campaignId");
if (campaignId) {
  registerConversion({ campaignId, revenue: order.totalPrice });
  sessionStorage.removeItem("campaignId");
}
```

**Pasul 5: Implementarea sincronizării Instagram**

```javascript
// instagramScraper.js
const mediaRes = await fetch(
  `https://graph.facebook.com/v19.0/${ACCOUNT_ID}/media` +
  `?fields=id,permalink,like_count,comments_count,reach,shares,saved` +
  `&access_token=${ACCESS_TOKEN}`
);
for (const media of mediaRes.data) {
  const shortcode = extractShortcode(media.permalink);
  await Analytics.findOneAndUpdate(
    { postId: shortcode },
    { views: media.reach, likes: media.like_count, ... }
  );
}
```

### 3.3. Prezentarea funcționalităților platformei (~4 pag.)

**Se vor prezenta cu capturi de ecran:**

**a) Pagina principală și catalogul de produse**
- Grid responsive cu produse, sistem de paginare, bară de căutare
- Afișare rating, preț, disponibilitate stoc

**b) Pagina de produs și sistemul de recenzii**
- Galerie imagine, detalii produs, selector cantitate
- Secțiunea de recenzii cu rating individual

**c) Fluxul de checkout**
- Pasul 1: Adresă de livrare (formular validat)
- Pasul 2: Metodă de plată (PayPal)
- Pasul 3: Sumar comandă + buton finalizare
- Redirecționare PayPal → confirmare plată

**d) Panel administrare — Gestionare produse/utilizatori/comenzi**
- Tabele cu operații CRUD inline
- Marcare livrată direct din lista de comenzi

**e) Creare Campanie Social Media (funcționalitate nouă — AI)**
- Selector platformă (Instagram / TikTok / YouTube / Facebook)
- Dropdown produse din catalog cu preview imagine și preț
- Câmpuri: nișă, cost estimat, stil conținut
- Buton "Generate with AI" → Gemini API → afișare caption + prompt Runway ML
- Buton "Copy" pentru caption și prompt
- Buton "Create Campaign & Get Tracking Link" → URL unic generat
- Câmp opțional "Link Instagram Post" → asociere shortcode pentru sync

**f) Analytics Dashboard (funcționalitate nouă)**
- KPI Cards Campaign Traffic: clicks, conversii, venituri, rată conversie
- KPI Cards Direct Traffic: vizite directe, conversii directe, venituri directe, total venituri
- Bar Chart: venituri per platformă social media (colorat per brand platformă)
- Pie Chart: atribuire venituri — campanii vs. trafic direct
- Filtru temporal: preset-uri (All time / 7 / 30 / 90 zile) sau interval personalizat
- Tabel campanii: Platformă, Produs, Nișă, Stil, Views, Likes, Shares, Clicks, Conversii, Venituri, Cost, ROI%, Rată conversie
- Buton "Sync Instagram" → actualizare metrici organice din Meta Graph API

**Comparație cu alte soluții:** față de un instrument standalone de tip Hootsuite sau Sprout Social, platforma TheNecessary oferă vizibilitate completă asupra întregii pâlnii de marketing — de la engagement-ul organic pe Instagram până la comanda finalizată în magazin — fără a necesita exporturi de date sau corelații manuale.

**Îmbunătățiri posibile:**
- Integrare directă cu TikTok Business API pentru metrici organice TikTok
- Email marketing automation (triggere post-cumpărare)
- A/B testing de caption-uri generate de AI
- Prognoze de vânzări bazate pe machine learning

---

## CONCLUZII (1–2 pag.)

**Conținut recomandat:**

Lucrarea de față a demonstrat fezabilitatea și utilitatea practică a unei platforme integrate care combină comerțul electronic cu instrumentele de marketing digital bazate pe inteligență artificială. Obiectivele propuse au fost realizate în totalitate:

1. **E-commerce funcțional** — platforma acoperă integral ciclul de viață al unui produs: listare, achiziție, plată, livrare, recenzii.

2. **Generare automată de conținut AI** — integrarea cu Google Gemini 2.5 Flash API permite crearea de caption-uri optimizate per platformă și prompturi pentru generare video în câteva secunde, reducând semnificativ timpul alocat creării de conținut.

3. **Tracking precis al conversiilor** — mecanismul de URL-uri unice per campanie, combinat cu atribuirea prin sessionStorage, permite identificarea exactă a comenzilor generate din fiecare postare social media.

4. **Dashboard analitic integrat** — centralizarea metricilor de engagement (Instagram API) cu datele comerciale (comenzi, venituri) oferă o perspectivă completă asupra ROI-ului per campanie, eliminând nevoia de corelări manuale între instrumente separate.

**Contribuția personală** constă în proiectarea și implementarea completă a modulului de marketing analytics, integrat organic într-un sistem e-commerce existent, cu accent pe fluxul de date de la rețelele sociale spre baza de date și vizualizarea acestora în timp real.

**Limitări actuale și perspective de dezvoltare:** token-ul de acces Meta Graph API necesită reînnoire periodică (maxim 60 de zile pentru Long-Lived Token), iar integrarea cu TikTok Business API pentru metrici organice reprezintă o extensie naturală a platformei. Pe termen mediu, introducerea unui modul de prognoză a vânzărilor bazat pe modele de machine learning ar consolida componenta de business intelligence a sistemului.

---

## BIBLIOGRAFIE

**Format Vancouver — exemple structurate:**

```
[1] MongoDB, Inc., MongoDB Documentation — Aggregation Pipeline,
    https://www.mongodb.com/docs/manual/aggregation/, [accesat Mai 2026]

[2] Google, Gemini API Documentation — Generative AI for Developers,
    https://ai.google.dev/docs, [accesat Mai 2026]

[3] Meta for Developers, Instagram Graph API Reference — Media,
    https://developers.facebook.com/docs/instagram-api/reference/ig-media,
    [accesat Mai 2026]

[4] Redux Toolkit, RTK Query Overview,
    https://redux-toolkit.js.org/rtk-query/overview, [accesat Mai 2026]

[5] M. Marcelino, MERN Stack — Building a Full-Stack Application,
    Packt Publishing, 2022, ISBN 978-1-80107-601-5

[6] React Core Team, React Documentation — Hooks Reference,
    https://react.dev/reference/react, [accesat Mai 2026]

[7] PayPal Developer, REST API Reference — Orders v2,
    https://developer.paypal.com/docs/api/orders/v2/, [accesat Mai 2026]

[8] Recharts Team, Recharts — A Composable Charting Library,
    https://recharts.org/en-US, [accesat Mai 2026]

[9] Render, Platform Documentation — Node.js Deployment,
    https://render.com/docs/node-express-app, [accesat Mai 2026]

[10] OWASP Foundation, OWASP Top Ten — A07:2021 Identification and Authentication Failures,
     https://owasp.org/Top10/A07_2021/, [accesat Mai 2026]

[11] Eurostat, E-commerce Statistics — Online Purchases by Individuals,
     https://ec.europa.eu/eurostat/statistics-explained/index.php/E-commerce_statistics,
     [accesat Mai 2026]

[12] Express.js, Express API Reference,
     https://expressjs.com/en/api.html, [accesat Mai 2026]

[13] Mongoose, Mongoose v8 Documentation,
     https://mongoosejs.com/docs/, [accesat Mai 2026]

[14] JSON Web Tokens, JWT Introduction,
     https://jwt.io/introduction, [accesat Mai 2026]

[15] Runway ML, Runway API Documentation — Video Generation,
     https://docs.runwayml.com/, [accesat Mai 2026]
```

---

## ANEXE

**Anexa 1:** Schema completă a bazei de date (diagrama ERD)
**Anexa 2:** Diagrame de secvență UML pentru fluxurile principale
**Anexa 3:** Capturi de ecran — interfața completă a platformei
**Anexa 4:** Fragmente de cod sursă relevante
  - analyticsController.js — endpoint generare AI
  - instagramScraper.js — sincronizare Meta Graph API
  - AnalyticsDashboardScreen.jsx — dashboard analytics
  - CreateCampaignScreen.jsx — creator campanii
**Anexa 5:** Configurare deployment Render + variabile de mediu
**Anexa 6:** Colecțiile MongoDB — structura documentelor (exemple JSON)
