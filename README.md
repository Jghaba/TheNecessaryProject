Academia de Studii Economice din București
Facultatea de Cibernetică, Statistică și Informatică Economică
Master SIMPRE




Proiect Cloud Computing
Dezvoltarea aplicației web de modă intitulată 'The Necessary': 'O soluție pentru cumpărarea și vânzarea de articole vestimentare







Student:
Cernica Sergiu-Rareș
Grupa:
1132




București, Mai 2025

Contents
Link video | Prezentare proiect | Demo aplicație	3
URL proiect | Vizitare aplicatie	3
Link GitHub Repository	3
Introducere	3
Descriere Problema	4s
Descriere API	5
1. OrderController (Comenzi)	5
2. ProductController (Produse)	6
3. UserController (Utilizatori)	7
PayPal Developer Sandbox Server	8
MongoDB Compass	8
Flux de date	9
Definire Flux	9
Exemple de request / response si Metode HTTP	9
Autentificare și autorizare servicii utilizate + Securitate	13
Capturi ecran aplicație	13
Referințe	20

 
Link video | Prezentare proiect | Demo aplicație

URL proiect | Vizitare aplicatie
[Welcome to TheNecessary](https://thenecessaryproject.onrender.com/)

Introducere
"The Necessary" este o aplicație web creată pentru a facilita vânzarea și cumpărarea de articole vestimentare pentru bărbați, oferind o soluție modernă și eficientă în domeniul comerțului electronic. Tema acestui proiect a fost aleasă datorită mai multor motive, fiecare contribuind la relevanța și importanța sa pe piața actuală.
În primul rând, industria modei masculine este în continuă expansiune, iar consumatorii devin din ce în ce mai exigenți în privința calității și diversității produselor oferite. Într-o piață tot mai competitivă, există o necesitate clară pentru platforme inovatoare care să răspundă cerințelor sofisticate ale clienților moderni. Aplicația The Necessary a fost proiectată pentru a oferi o experiență de cumpărare simplificată și personalizată, adresând direct aceste cerințe printr-un design prietenos și funcționalități avansate.
Motivația principală din spatele dezvoltării The Necessary a fost dorința de a acoperi un gol existent pe piață. În ciuda numeroaselor platforme de e-commerce disponibile, puține sunt dedicate exclusiv modei masculine și chiar mai puține oferă o gamă variată de produse, de la îmbrăcăminte casual la formală, accesibile printr-un singur click. The Necessary își propune să devină destinația principală pentru bărbații care doresc să-și definească stilul vestimentar fără a compromite confortul cumpărăturilor online.
Pe lângă aspectul de business, alegerea acestei teme este motivată și de tendințele sociale și tehnologice actuale. Creșterea rapidă a utilizării dispozitivelor mobile și preferința pentru cumpărăturile online în detrimentul celor tradiționale au creat oportunități semnificative pentru platformele de e-commerce. The Necessary nu doar că răspunde acestei tendințe, ci o și amplifică, oferind utilizatorilor o aplicație optimizată pentru mobil, cu navigare intuitivă și opțiuni de plată securizate, contribuind astfel la o experiență de cumpărare impecabilă.
În plus, ne-am propus să transformăm The Necessary într-o marcă de încredere, sinonimă cu calitatea și inovația. Fiecare aspect al aplicației, de la selecția produselor până la serviciul pentru clienți, este conceput pentru a depăși așteptările utilizatorilor și pentru a construi loialitatea acestora pe termen lung. Într-o eră în care fidelizarea clienților este esențială pentru succesul oricărei afaceri, The Necessary se angajează să ofere nu doar produse de top, ci și o relație autentică și constantă cu fiecare client.
Astfel, alegerea de a dezvolta The Necessary a fost determinată de o combinație de factori economici, tehnologici și sociologici, toți convergând spre un singur obiectiv: crearea unei platforme de e-commerce de neegalat pentru moda masculină. Credem cu tărie că The Necessary va reuși să redefinească standardele în comerțul electronic vestimentar pentru bărbați, oferind o soluție care să îmbine inovația cu satisfacția clientului, într-un mod unic și eficient.

Descriere Problema

Problema principală pe care această lucrare o adresează este construirea unei platforme web eficiente, sigure și scalabile, capabile să susțină dezvoltarea continuă a brandului The Necessary și să creeze o experiență superioară pentru clienți. Alegerea utilizării tehnologiilor cloud devine astfel nu doar o soluție tehnică, ci și o strategie de business, esențială pentru viitorul companiei într-un mediu digital competitiv.

La începutul anului 2025, societatea comercială The Necessary S.R.L., cu sediul în București, România, se află într-o etapă de consolidare și expansiune, continuând dezvoltarea inițiată în 2024. Încă de la înființare, compania s-a remarcat printr-un concept unic dedicat modei masculine, abordând comerțul exclusiv online. Fondatorul firmei, pasionat de industria vestimentară, a pus bazele unei afaceri ce combină inovația, calitatea și expresia individuală a clienților într-un mod modern și eficient.

Cu o cifră de afaceri în creștere și o bază tot mai extinsă de clienți, firma a identificat nevoia de a optimiza și automatiza relația cu publicul prin dezvoltarea unei aplicații web performante. Această aplicație trebuie să răspundă cerințelor pieței actuale, în care utilizatorii își doresc o experiență de cumpărare fluidă, sigură și personalizată.

Problema principală identificată constă în lipsa unei platforme centralizate, scalabile și suficient de flexibile care să susțină creșterea rapidă a firmei, să faciliteze interacțiunea eficientă cu clienții și să asigure un grad ridicat de securitate pentru datele personale și tranzacționale. În plus, din analiza concurenței reiese că multe platforme existente au interfețe greoaie, procese de cumpărare fragmentate și măsuri de securitate insuficiente – aspecte pe care The Necessary dorește să le depășească.

Astfel, se conturează nevoia dezvoltării unei aplicații web moderne, adaptată nevoilor actuale ale pieței de e-commerce, cu accent pe:

•	Accesibilitate și interfață intuitivă, ușor de utilizat de pe orice dispozitiv;

•	Funcționalități avansate de căutare și filtrare, pentru a facilita selecția produselor;

•	Proces de achiziție optimizat, fără bariere tehnice sau pași inutili;

•	Protecția datelor cu caracter personal, prin implementarea celor mai noi standarde de securitate informatică (inclusiv criptare, autentificare multifactor, politici stricte de acces și monitorizare continuă);

•	Infrastructură scalabilă și eficientă, capabilă să susțină un volum mare de accesări și comenzi, fără întreruperi.

Pentru atingerea acestor obiective, The Necessary S.R.L. a ales să se bazeze pe tehnologii cloud, care oferă o serie de avantaje esențiale în dezvoltarea aplicației:

•	Scalabilitate automată, care permite adaptarea resurselor în funcție de trafic;

•	Acces global și disponibilitate ridicată, esențiale pentru o platformă care se adresează unei piețe online dinamice;

•	Securitate integrată și actualizări constante, prin servicii cloud de încredere

•	Costuri operaționale optimizate, prin eliminarea necesității de infrastructură fizică proprie.
Descriere API

Tip API: REST
Sistemul implementează un API de tip REST, structurat în jurul resurselor principale: comenzi (orders), produse (products) și utilizatori (users). API-ul oferă metode standard HTTP: GET, POST, PUT, DELETE.

1. OrderController (Comenzi)
Acest controller gestionează logica legată de comenzile plasate de utilizatori.

Rute implementate:
•	POST /api/orders – Creează o comandă nouă. Verifică stocul produselor și calculează prețurile (total, taxe, transport).

•	GET /api/orders/myorders – Returnează comenzile utilizatorului logat.

•	GET /api/orders/:id – Returnează o comandă după ID (doar dacă utilizatorul este proprietarul sau admin).

•	PUT /api/orders/:id/pay – Marchează o comandă ca plătită. Integrare cu PayPal pentru validare.

•	PUT /api/orders/:id/deliver – Marchează o comandă ca livrată (doar pentru admin).

•	GET /api/orders – Returnează toate comenzile (doar pentru admin), cu paginare.

Observații:
•	Include verificări de stoc și actualizări de inventar în momentul plasării comenzii.

•	Folosește middleware pentru autentificare și autorizare.

•	Folosește funcții externe pentru integrarea cu PayPal: verifyPayPalPayment și checkIfNewTransaction.


Fișier .js de referință:

 
2. ProductController (Produse)
Acest controller oferă funcționalități complete pentru gestionarea produselor.

Rute implementate:
•	GET /api/products – Returnează lista de produse cu paginare și opțiune de căutare.

•	GET /api/products/:id – Returnează un produs după ID.

•	POST /api/products – Creează un produs nou (privat).

•	PUT /api/products/:id – Actualizează un produs (doar admin).

•	DELETE /api/products/:id – Șterge un produs (doar admin).

•	POST /api/products/:id/reviews – Adaugă o recenzie la produs (privat, o singură recenzie per utilizator).

•	GET /api/products/top – Returnează top 5 produse după rating.

Observații:
•	Permite adăugarea și calcularea ratingurilor din recenzii.

•	Susține paginarea și filtrarea după keyword în listarea produselor.

•	Verifică dacă utilizatorul a recenzat deja produsul.

Fișier .js de referință:
 
3. UserController (Utilizatori)
Gestionează autentificarea, înregistrarea și administrarea utilizatorilor.

Rute implementate:
•	POST /api/users/login – Autentifică un utilizator și returnează un token JWT în cookies.

•	POST /api/users – Înregistrează un nou utilizator.

•	POST /api/users/logout – Șterge token-ul JWT și deloghează utilizatorul.

•	GET /api/users/profile – Returnează profilul utilizatorului logat.

•	PUT /api/users/profile – Actualizează profilul utilizatorului logat.

•	GET /api/users – Returnează toți utilizatorii (doar admin, cu paginare).

•	GET /api/users/:id – Returnează un utilizator după ID (doar admin).

•	DELETE /api/users/:id – Șterge un utilizator (doar admin; protecție pentru admini).

•	PUT /api/users/:id – Actualizează un utilizator (doar admin).

Observații:
•	Toate parolele sunt criptate.

•	Tokenul JWT este generat în cookie HTTP-only pentru securitate.

•	Verifică drepturile utilizatorului înainte de operații de tip admin.

Fișier .js de referință:

 

În cadrul dezvoltării sistemului REST API pentru gestionarea comenzilor, produselor și utilizatorilor, au fost utilizate două instrumente externe esențiale pentru testare și validare: PayPal Developer Sandbox și MongoDB Compass. Acestea, deși nu fac parte din logica principală a API-ului, au avut un rol important în verificarea funcționalității și stabilității aplicației.

PayPal Developer Sandbox Server
Rolul în sistem:

•	PayPal Sandbox este o platformă de testare oferită de PayPal pentru simularea plăților online.

•	A fost utilizat pentru a testa endpoint-ul PUT /api/orders/:id/pay, responsabil cu marcarea unei comenzi ca fiind plătită.

•	API-ul nostru trimite o solicitare către serverele PayPal Sandbox pentru a verifica validitatea unei tranzacții simulate, fără a folosi fonduri reale.

Beneficii:

•	Permite testarea completă a fluxului de plată într-un mediu sigur.

•	Ajută la prevenirea erorilor în integrarea cu PayPal Live.

•	Oferă feedback clar asupra validității unui ID de tranzacție.

Legătura cu API-ul:

•	API-ul implementează integrarea cu un API extern (PayPal), ceea ce presupune autentificare, validare și comunicare în ambele direcții.

•	Tranzacțiile simulate au fost esențiale pentru testarea funcționalității de marcare a comenzilor ca „plătite”.

MongoDB Compass
Rolul în sistem:

•	MongoDB Compass este o interfață grafică pentru lucrul cu baza de date MongoDB.

•	A fost folosit pentru inspecția și validarea manuală a datelor gestionate de API: comenzi, produse, utilizatori, etc.

•	A oferit o modalitate rapidă de a vizualiza documentele MongoDB fără a folosi interfața în linie de comandă.

Beneficii:

•	Permite verificarea structurii și valorilor din documente în timp real.

•	Ajută la identificarea ușoară a erorilor în salvarea datelor prin API.

•	Este util în testarea operațiilor CRUD implementate în controllere.

Legătura cu API-ul:

•	MongoDB Compass nu este parte directă a API-ului, însă este un instrument de suport în procesul de testare.

•	A fost utilizat pentru confirmarea că API-ul funcționează corect la nivel de persistare a datelor.
Flux de date
Definire Flux
Aplicația React construita folosește Redux Toolkit și RTK Query, astfel fluxul de date reprezintă traseul parcurs de datele aplicației, de la momentul inițializării unei cereri (request) până la actualizarea interfeței (UI) în funcție de răspuns (response).

Acest flux implică:

•	Componenta React inițiază o acțiune (ex. register, updateProfile, createOrder).

•	RTK Query face automat cererea HTTP către API.

•	Răspunsul este automat stocat în store-ul Redux.

•	Componenta se reîncărcă (re-render) pe baza noilor date.

•	Redux poate folosi și slice-uri auxiliare (ex. authSlice, cartSlice) pentru a păstra starea aplicației (ex. userInfo, cartItems, shippingAddress).

Exemple de request / response si Metode HTTP

1. Înregistrare utilizator (RegisterScreen)
•	Endpoint: /api/users/register
•	Cod sursa:
 

•	Metodă HTTP: POST

Request body (JSON):
{
  "name": "string",
  "email": "string",
  "password": "string"
}


Răspuns (Succes):

{
  "_id": "string",
  "name": "string",
  "email": "string",
  "token": "string"
}

Flux:

•	Utilizatorul introduce datele în formular.

•	Se trimite request POST cu datele.

•	Server validează datele, creează utilizatorul, generează un token JWT.

•	Tokenul este stocat în Redux (state auth).

•	Navigare automată după succes.

Metode securitate:

•	Validare server-side a datelor (email unic, parolă puternică).

•	Token JWT emis pentru autentificare.

•	Comunicarea ar trebui să fie prin HTTPS.

•	Erori bine gestionate și afișate utilizatorului.

2. Actualizare profil utilizator (ProfileScreen)
•	Endpoint: /api/users/profile
•	Cod sursa:
 

•	Metodă HTTP: PUT

Request body (JSON):

{
  "_id": "string",
  "name": "string",
  "email": "string",
  "password": "string"  // poate fi gol dacă nu se schimbă
}
Răspuns (Succes):

{
  "_id": "string",
  "name": "string",
  "email": "string",
  "token": "string"
}
Flux:

•	Datele curente sunt încărcate în formular.

•	Utilizatorul modifică datele.

•	Se trimite request PUT cu datele actualizate.

•	Server validează și actualizează profilul.

•	Tokenul este reemis și actualizat în store.

Metode securitate:

•	Autentificare obligatorie (token JWT transmis în header Authorization).

•	Validări parolă și date personale.

•	Protecție împotriva modificării profilului altor utilizatori (verificare identitate).

•	HTTPS.

3. Obținerea comenzilor utilizatorului (ProfileScreen)
•	Endpoint: /api/orders/myorders
•	Cod sursa:
 

•	Metodă HTTP: GET

Request: N/A

Răspuns (Succes): Array JSON cu comenzile utilizatorului:

[
  {
    "_id": "string",
    "createdAt": "string",
    "totalPrice": "number",
    "isPaid": "boolean",
    "paidAt": "string|null",
    "isDelivered": "boolean",
    "deliveredAt": "string|null"
  },
  ...
]
Flux:

•	La încărcarea profilului, se face un request GET pentru comenzi.

•	Server returnează lista comenzilor aferente utilizatorului autentificat.

•	Metode securitate:

•	Autentificare JWT obligatorie.

•	Server returnează doar comenzile utilizatorului curent.

•	HTTPS.

4. Salvare metodă de plată (PaymentScreen)
•	Endpoint: N/A (date stocate în Redux local)
•	Cod sursa:
 


Flux:

•	Utilizatorul alege metoda de plată.

•	Alegerea este salvată în state-ul Redux (slice cart).

•	Navigare către ecranul următor.

Metode securitate:

•	Datele sensibile (metoda de plată) sunt stocate temporar în store, nu trimise până la plasarea comenzii.

•	Validare simplă pe client.

Autentificare și autorizare servicii utilizate + Securitate

Capturi ecran aplicație
a)	Interfata Paginii Principale

 
Figura 1. Interfața paginii principale

Pagina principală a aplicației "The Necessary" oferă utilizatorilor o navigare ușoară și acces rapid la produsele cele mai apreciate de clienți prin intermediul banner-ului. Antetul facilitează căutarea și navigarea, iar secțiunea de produse recente permite utilizatorilor să vadă și să exploreze rapid ofertele disponibile. Subsolul oferă informații suplimentare și link-uri utile, completând astfel experiența de utilizare a paginii principale.
b)	Interfata Paginii de produs

 
Figura 2. Interfața de produs

Interfața de produs a aplicației "The Necessary" oferă utilizatorilor toate informațiile necesare despre produs într-un format clar și accesibil. Imaginea mare a produsului, împreună cu detaliile esențiale și butonul de adăugare în coș, facilitează procesul de cumpărare. Secțiunea de recenzii oferă feedback util de la alți utilizatori, doar în cazul in care aceștia sunt logați si cu o limitare de o recenzie / produs.

c)	Interfața Coșului de cumpărături
 
Figura 3. Interfața coșului de cumpărături

Interfața coșului de cumpărături este proiectată pentru a oferi utilizatorilor o experiență de cumpărături facilă și eficientă, utilizatorii fiind capabili în a vizualiza toate produsele adăugate în coș, putând modifica și cantitatea acestora direct din această pagină dar putând să și elimine produsele nedorite. Secțiunea de subtotal afișează suma totală a articolelor din coș, iar butonul "Proceed To Checkout" permite utilizatorilor să finalizeze achiziția rapid și fără efort. Antetul rămâne consistent pentru navigare ușoară și acces rapid la alte secțiuni ale site-ului.

d)	Interfețele parcurse pentru Checkout

În procesul de comandă al aplicației "The Necessary," utilizatorii parcurg trei pagini principale:

•	Shipping (Livrare): Colectează informațiile de livrare.
 
Figura 4. Interfața pentru introducerea datelor de livrare

•	Payment Method (Metodă de Plată): Permite selectarea metodei de plată.
 
Figura 5. Interfața pentru selectarea metodei de plată

•	Place Order (Confirmare Comandă): Afișează un rezumat complet al comenzii pentru confirmare finală.
 
Figura 6. Interfața pentru sumarul comenzii

Acest flux asigură o experiență de cumpărare simplă și eficientă, ghidând utilizatorii prin fiecare pas necesar pentru a plasa și finaliza o comandă. Fiecare pagină este concepută pentru a fi intuitivă și ușor de utilizat, asigurând astfel satisfacția utilizatorului și eficiența procesului de comandă.


e)	Interfața redirectării pentru plată

 
Figura 7. Interfața pentru plată cu PayPal
Pagina de rezumat al comenzii din aplicația "The Necessary" este concepută pentru a oferi utilizatorilor o imagine completă și detaliată asupra comenzii lor, înainte de a finaliza plata. Utilizatorii pot vedea informațiile de livrare, metoda de plată aleasă, starea plății și detalii despre produsele comandate și au integrată opțiunea de plată prin PayPal ce adaugă o modalitate sigură și convenabilă de a finaliza tranzacția. 

f)	Intefața de profil a utilizatorului

 
Figura 8. Interfața de prof

Interfața paginii de profil a utilizatorului din aplicație oferă utilizatorilor o modalitate simplă și eficientă de a gestiona informațiile personale și de a vizualiza istoricul comenzilor. Secțiunea "User Profile" permite actualizarea numelui, adresei de email și parolei, în timp ce secțiunea "My Orders" afișează detalii esențiale despre comenzile plasate, incluzând statusul plății și livrării.Astfel, se face posibilă ținerea la curent a clienților.

g)	Interfața de administrare a produselor

 
Figura 9. Interfața de administrare a produselor

Interfața de administrare a produselor din aplicația "The Necessary" este concepută pentru a oferi administratorilor un control complet asupra inventarului de produse extras in baza de date. Tabelul detaliat afișează toate informațiile esențiale despre produse, butoanele de editare și ștergere permit gestionarea rapidă și eficientă a fiecărui produs, iar butonul de creare a produselor facilitează adăugarea rapidă a noilor produse în magazin. Controalele de paginare asigură că administratorii pot naviga ușor printr-o listă extinsă de produse, menținând astfel o organizare clară și accesibilă a inventarului.

h)	Interfețele de sign-in si sign-up

 
Figura 10. Interțata de Sign In
 
Figura 11. Interfața de Sign Up

Interfețele de autentificare și înregistrare sunt concepute pentru a oferi utilizatorilor o experiență simplă și eficientă de accesare și creare a conturilor. Pagina de autentificare permite utilizatorilor existenți să se conecteze rapid la conturile lor și aruncă o eroare dacă se încearcă autentificarea fără un cont existent,iar pagina de înregistrare facilitează crearea de conturi noi, incluzând restricții pe email și parolă pentru a asigura validitatea datelor introduse. 

Referințe

•	React Documentation. React – A JavaScript library for building user interfaces. https://reactjs.org/docs/getting-started.html

•	Smith, John. Modern Web Development. TechBooks Publishing, 2020.

•	Redux Toolkit Documentation. https://redux-toolkit.js.org/

•	Stack Overflow. "How to handle JWT authentication in React." https://stackoverflow.com/questions/

•	MongoDB Documentation. https://docs.mongodb.com/manual/ 

