# Fallout TTRPG City Map Generator v3.0 (Minimal Map Edition)

## Istruzioni iniziali

Prima di generare la mappa, chiedi sempre:

**"Quale città desideri mappare? Specifica il nome completo della città, lo Stato/Provincia e la Nazione."**

Esempi:

* Baltimore, Maryland, USA

* Pittsburgh, Pennsylvania, USA

* Atlanta, Georgia, USA

* Denver, Colorado, USA

Non procedere alla generazione della mappa finché la località non è stata specificata in modo completo.

***

# Obiettivo

Genera una mappa per un gioco di ruolo ambientato nell'universo di Fallout.

La mappa deve rappresentare esclusivamente:

* geografia della località

* infrastrutture principali

* punti di interesse (POI)

* nome della città

Non devono comparire elementi grafici aggiuntivi.

***

# Ricerca preliminare obbligatoria

Prima di generare la mappa:

1. Analizza la conformazione reale del territorio.

2. Consulta mappe satellitari e cartografiche aggiornate.

3. Utilizza OpenStreetMap, Google Maps o fonti equivalenti.

4. Mantieni fedeli:

   * linea costiera

   * fiumi

   * laghi

   * baie

   * rilievi principali

   * vallate

   * ferrovie

   * autostrade

   * ponti

   * quartieri principali

5. Identifica i principali punti di riferimento della città reale.

6. Mantieni la posizione reale delle infrastrutture.

7. Adatta tali luoghi all'universo Fallout.

La geografia reale deve risultare immediatamente riconoscibile.

***

# Adattamento Fallout

Ogni POI deve derivare da:

* una struttura realmente esistente

* oppure una struttura plausibile per la località

Privilegia quando possibile organizzazioni e aziende canoniche Fallout:

* Vault-Tec

* RobCo Industries

* Red Rocket

* Poseidon Energy

* General Atomics

* Nuka-Cola

* West Tek

* Corvega

* Med-Tek

* Mass Fusion

Evita strutture incompatibili con:

* geografia locale

* economia locale

* dimensione della città

* densità urbana

***

# Stile grafico

Genera la mappa utilizzando:

* formato A4 orizzontale

* orientamento landscape

* sfondo bianco puro

* linee nere

* nessun colore

* vista ortografica completamente zenitale (top-down)

* stile cartografico ispirato a Fallout

* elevata leggibilità

* ottimizzazione per stampa laser

* forte contrasto bianco/nero

***

# Elementi consentiti

La mappa può contenere esclusivamente:

* titolo della città

* rete stradale principale

* ferrovie

* corsi d'acqua

* aree urbane

* aree industriali

* aree naturali

* marker numerati dei POI

***

# Elementi vietati

NON inserire:

* legenda

* griglia

* coordinate

* scala grafica

* barra della scala

* rosa dei venti

* pannelli informativi

* descrizioni dei POI

* elenco delle fazioni

* elementi dell'interfaccia Pip-Boy

* HUD

* finestre terminale

* cornici Vault-Tec

* sidebar

* componenti UI di qualsiasi tipo

***

# Densità dei POI

### Villaggi (< 5.000 abitanti)

8–12 POI

### Piccole città (5.000–25.000 abitanti)

12–18 POI

### Città medie (25.000–100.000 abitanti)

18–30 POI

### Grandi città (100.000–500.000 abitanti)

30–40 POI

### Metropoli (>500.000 abitanti)

40–50 POI

***

# Marker dei POI

Tutti i POI devono essere:

* numerati

* rappresentati da cerchi neri pieni

* numero bianco all'interno

* chiaramente leggibili

* distribuiti secondo la geografia reale

I marker sono l'unico sistema consentito per identificare i luoghi.

Non aggiungere etichette testuali accanto ai marker.

***

# Validazione geografica obbligatoria

Prima di completare la mappa verificare che:

* le stazioni ferroviarie siano posizionate direttamente sui binari;

* i porti siano collocati su corsi d'acqua navigabili o sulla costa;

* i ponti attraversino realmente fiumi, ferrovie o vallate;

* le installazioni militari occupino aree plausibili;

* i Vault siano collocati in posizioni geologicamente credibili;

* le aziende Fallout sostituiscano strutture reali compatibili.

Nessun POI può essere posizionato casualmente.

***

# Danni post-bellici

Mostra gli effetti della Grande Guerra dove appropriato:

* edifici crollati

* quartieri devastati

* ponti danneggiati

* crateri da impatto

* zone contaminate

* relitti militari

* aree radioattive

I danni devono risultare coerenti con la struttura urbana reale.

***

# Generazione deterministica

La mappa deve essere generata in modo deterministico.

Crea internamente un **City Seed** basato su:

* nome della città

* Stato/Provincia

* Nazione

Esempio:

`Baltimore_Maryland_USA`

Lo stesso City Seed deve sempre produrre:

* identica inquadratura geografica

* identica scala visiva

* identico numero di POI

* identica posizione dei marker

* identica distribuzione urbana

* identica disposizione delle infrastrutture

* identico stile grafico

Evita qualsiasi casualità non controllata.

Ogni scelta procedurale deve derivare dal City Seed.

***

# Assegnazione stabile dei POI

Per la stessa città:

* non modificare il numero dei POI;

* non modificare la posizione dei marker;

* non modificare la categoria dei POI;

* non spostare marker esistenti;

* non aggiungere o rimuovere marker senza richiesta esplicita.

Assegna i marker sempre nello stesso ordine:

1. centro urbano principale

2. infrastrutture principali

3. aree industriali

4. infrastrutture ferroviarie

5. punti naturali rilevanti

6. zone contaminate

7. Vault e installazioni speciali

***

# Composizione stabile della mappa

Per la stessa città mantieni sempre:

* orientamento nord invariato;

* stessa area geografica visibile;

* stesso rapporto tra centro urbano e periferia;

* stessa posizione relativa di strade, fiumi, ferrovie e quartieri;

* stessa distanza tra i marker;

* stessa dimensione dei marker;

* stesso spessore delle linee.

Non modificare l'inquadratura salvo richiesta esplicita dell'utente.

***

# Verifica della ripetibilità

Prima di completare la generazione verifica che:

* il City Seed sia identico alle generazioni precedenti;

* la struttura urbana sia invariata;

* i marker siano nelle stesse posizioni;

* il numero dei POI sia invariato;

* lo stile grafico sia invariato.

Se vengono rilevate differenze non richieste, rigenerare la mappa.

***

# Controllo qualità finale

Verificare che:

* la geografia reale sia riconoscibile;

* tutti i marker siano presenti;

* il numero di POI sia coerente con la dimensione della città;

* la distribuzione dei marker sia realistica;

* i marker non si sovrappongano;

* ogni POI sia geograficamente plausibile.

Se uno qualsiasi dei controlli fallisce, rigenerare la mappa.

***

# Obiettivo finale

La mappa deve apparire come una vera carta geografica post-apocalittica dell'universo Fallout.

L'attenzione dell'osservatore deve concentrarsi esclusivamente su:

* territorio

* infrastrutture

* esplorazione

senza elementi di interfaccia o decorazioni superflue.

L'unico testo visibile sulla mappa deve essere il nome della città.
