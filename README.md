# Disneycharacters

Deze interactieve webapplicatie toont welke psychische stoornissen gekoppeld zijn aan verschillende Disney-personages. De applicatie is bedoeld om gebruikers op een toegankelijke manier inzicht te geven in mentale stoornissen door herkenning en identificatie via bekende karakters.

Het project combineert educatie, bewustwording en een vleugje entertainment om mentale gezondheid bespreekbaar te maken op een visueel aantrekkelijke en speelse manier.

## Gebruikte technologieën

- **Framework**: Vue.js
- **API**: [Disney API](https://disneyapi.dev/) – levert informatie over personages (zoals afbeeldingen en films)
- **JSON-data**: `characterdisorder.json` – bevat koppelingen tussen personages en psychische stoornissen op basis van bronnen

## 📁 Projectstructuur

| Bestand                  | Beschrijving                                           |
| ------------------------ | ------------------------------------------------------ |
| `assets/images/`         | Alle gebruikte afbeeldingen (logo's, Tinkerbell, enz.) |
| `characterdisorder.json` | JSON-bestand met stoornisinformatie per personage      |
| `Maincharacter.vue`      | Component met de zoeklogica en interactieve weergave   |
| `characterKart.vue`      | Flip-cards voor de personages                          |
| `App.vue`                | Hoofdstructuur + themakeuze                            |
| `main.css` / `base.css`  | Styling en thematische ondersteuning                   |

---

## Functionaliteiten

- 🔍 **Zoeken** op Disney-personage of stoornis
- 🎲 **Toon een willekeurig personage**
- 🧚‍♀️ **Tinkerbell-suggesties** bij zoekhulp voor stoornissen
- 🌓 **Keuze uit twee thema’s**:
  - _Classic_: licht met blauw/wit
  - _Villain_: donker met rood/zwart
- 📃 **Flip-cards** met uitleg over de stoornis
- 🎨 **Dynamische stijlen** per thema (kleuren, typografie, afbeeldingen)

## Installatie & uitvoeren

Clone het project of download de bestanden.

Voer in de terminal de volgende commando uit:

```sh
npm install
```

Als de installatie gelukt is dan het volgende commando uitvoeren om de applicatie te laten starten:

```sh
npm run dev
```

## ✅ Testen

Na het opstarten (`npm run dev`), kun je de app testen door:

- Personages of stoornissen in te typen in de zoekbalken
- Te wisselen van thema (classic/villain)
- Op de random character knop te klikken
- Op Tinkerbell te klikken voor suggesties
- Op kaarten te klikken om ze te flippen

## 📚 Bronnen

De koppeling tussen Disney-personages en psychische stoornissen is gebaseerd op informatie en inspiratie uit de volgende online bronnen:

- [Equity Atlas – Disney Characters with Mental Disorders](https://equityatlas.org/disney-characters-with-mental-disorders/)
- [NeuroLaunch – Exploring Bipolar Disorder in Disney Characters](https://neurolaunch.com/disney-characters-with-mental-disorders-exploring-bipolar-disorder/)
- [West GA Wellness Center – Disney Characters That Suffer from Mental Disorders](https://westgawellnesscenter.com/disney-characters-that-suffer-from-mental-disorders/)
