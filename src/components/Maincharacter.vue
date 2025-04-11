<script setup>
import characterDisorders from '../assets/characterdisorder.json';
import { toRaw } from 'vue';
import CharacterKart from './characterKart.vue';
</script>

<template>
  <!-- Hoofdcontainer met alle zoekfunctionaliteit -->
  <div class="zoekbalk-container" v-if="dateLoaded">

    <!-- Zoekbalk voor het zoeken op characternaam -->
    <input type="text" v-model="searchQuery2" placeholder="Search by character..." @input="filterCharacters2"
      @focus="resetSelectedButton" class="zoekbalk" />

    <!-- Zoekbalk voor het zoeken op stoornis met Tinkerbell erboven -->
    <div class="zoekbalk-wrapper">
      <input type="text" v-model="searchQuery" placeholder="Search by disorder..." @input="filterCharacters"
        @focus="clearSearchQuery" class="zoekbalk" />

      <!-- Tinkerbell icoon rechtsboven de zoekbalk -->
      <div class="tinkerbell-wrapper" @click="toggleSuggestieBox">

        <!-- Afbeelding wisselt afhankelijk van state (normaal of 'dust') -->
        <img ref="tinkerbellImg" :src="tinkerbellImageSrc" alt="Tinkerbell"
          :class="['tinkerbell', { 'dust': toonSuggestieBox }]" />

        <!-- Tooltip wordt alleen getoond als suggestiebox nog niet open is -->
        <div v-if="!toonSuggestieBox" class="tooltip">
          Sometimes all you need is a little fairy help.
        </div>

        <!-- Suggesties voor disorders verschijnen onder Tinkerbell bij klik -->
        <div v-if="toonSuggestieBox" class="suggestie-box left">
          <span v-for="disorder in randomDisorders" :key="disorder" @click="selectSuggestie(disorder)">
            {{ disorder }}
          </span>
        </div>
      </div>
    </div>

    <!-- Knoppen voor willekeurig character en alles tonen -->
    <button @click="handleButtonClick('random')" :class="['random-knop', { active: selectedButton === 'random' }]">
      Random Character
    </button>

    <button @click="handleButtonClick('all')" :class="['random-knop', { active: selectedButton === 'all' }]">
      Show All Characters
    </button>
  </div>


  <!-- Fallback als er geen resultaten zijn gevonden -->
  <div v-if="dateLoaded && filteredCharacters.length === 0" class="no-results">
    <img src="../assets/images/mickeymouse.png" alt="" class="no-results-img" />
    <p>Gosh! Mickey couldn’t find any characters that match your search!</p>
  </div>


  <!-- Container met alle character kaarten als er wel data is -->
  <div v-if="dateLoaded" class="character-container">
    <div v-for="character in filteredCharacters" :key="character.id" class="character">
      <character-kart :character="character.name" :id="character._id" :disorder="character.disorder"
        :image="character.imageUrl" :explanation="character.explanation"></character-kart>
    </div>
  </div>


  <!-- Laadscherm met Mickey-animatie als data nog aan het laden is -->
  <div v-else class="loading">
    <img src="../assets/images/steamb-boat-mickey.gif" alt="Mickey Mouse Steamboat Willie 1928 GIF" class="loading-img" />
    <p class="loading-text">
      Mickey’s navigating the steamboat of info your way — the data boat is almost docked!
    </p>
  </div>

</template>

<script>
export default {
  // Theme (classic of villain) wordt doorgegeven als prop vanuit App.vue
  props: {
    currentTheme: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      mainCharacters: {},              // Alle karakters + extra info
      filteredCharacters: [],          // Gefilterde karakters voor weergave
      dateLoaded: false,               // Data niet binnengekomen
      searchQuery: '',                 // Input voor disorder-zoekbalk
      searchQuery2: '',                // Input voor character-zoekbalk
      selectedButton: '',              // Welke knop is geselecteerd
      allDisorders: [],                // Unieke lijst met stoornissen
      randomDisorders: [],            // Suggesties (willekeurige stoornissen)
      toonSuggestieBox: false         // Toggle voor het suggestievenster
    };
  },

  computed: {
    // Dynamische afbeelding voor Tinkerbell gebaseerd op theme en suggestiestatus
    tinkerbellImageSrc() {
      if (this.toonSuggestieBox) {
        return '/src/assets/images/tinkerbellDust.png';
      } else if (this.currentTheme === 'villain') {
        return '/src/assets/images/tinkerbellVillain.png';
      } else {
        return '/src/assets/images/tinkerbell.png';
      }
    }
  },

  async mounted() {
    await this.fetchdisorder(); // Laad karakters en bijbehorende data bij opstart
  },

  methods: {
    // Zoekveld resetten en suggesties sluiten
    clearSearchQuery() {
      this.searchQuery = '';
      this.filteredCharacters = this.mainCharacters;
      this.searchSuggestions = [];
      this.toonSuggestieBox = false;
    },

    // Random stoornissen tonen in suggestiebox
    getRandomDisorders() {
      const disorders = [...new Set(characterDisorders.map(c => c.disorder))];
      const shuffled = disorders.sort(() => 0.5 - Math.random());
      this.randomDisorders = shuffled.slice(0, 2);
    },

    // Suggestiebox openen/sluiten
    toggleSuggestieBox() {
      this.toonSuggestieBox = !this.toonSuggestieBox;
      if (this.toonSuggestieBox) {
        this.getRandomDisorders();
      }
    },

    // Bij klik op een suggestie: vul de zoekbalk + filter meteen
    selectSuggestie(disorder) {
      this.searchQuery = disorder;
      this.filterCharacters();
      this.toonSuggestieBox = false;
    },

    // Knop (random/all) logica
    handleButtonClick(type) {
      this.selectedButton = type;
      if (type === 'random') {
        this.showRandomCard();
      } else if (type === 'all') {
        this.resetFilters();
      }
    },

    // Geselecteerde knop resetten
    resetSelectedButton() {
      this.selectedButton = '';
    },

    // Willekeurig 1 character tonen
    showRandomCard() {
      const randomIndex = Math.floor(Math.random() * this.mainCharacters.length);
      const randomCharacter = this.mainCharacters[randomIndex];
      this.filteredCharacters = [randomCharacter];
    },

    // Alles tonen (geen filters actief)
    resetFilters() {
      this.searchQuery = '';
      this.searchQuery2 = '';
      this.filteredCharacters = this.mainCharacters;
    },

    // Laad data uit JSON + API, en voeg extra info toe
    async fetchdisorder() {
      // Maak een mapping aan van character-namen naar hun uitleg uit de JSON
      const explanationMap = {};
      characterDisorders.forEach(c => {
        explanationMap[c.name] = c.explanation;
      });

      // Loop door alle characters die in de characterDisorders JSON staan
      for (var j of characterDisorders) {
        const c_name = j.name;

        // Ga alleen door als er een naam is ingevuld
        if (c_name != undefined) {
          // Bouw de API-url op voor deze naam
          const url = `https://api.disneyapi.dev/character?name=${c_name}`;

          // Haal de gegevens van de API op
          await fetch(url).then(response => response.json()).then(resultFromApi => {

            // Controleer of er één of meer resultaten zijn gevonden in de API
            if (resultFromApi.info.count > 0) {
              var filteredResults = resultFromApi.data;

              // Meerdere resultaten gevonden → kies degene met de meeste films
              if (filteredResults.length > 1) {
                const mostFilmsCharacter = filteredResults.reduce((prev, current) =>
                  (prev.films.length > current.films.length) ? prev : current
                );

                // Voeg deze character toe aan mainCharacters en verrijk met extra info
                this.mainCharacters[c_name] = mostFilmsCharacter;
                this.mainCharacters[c_name].disorder = j.disorder;
                this.mainCharacters[c_name].explanation = explanationMap[c_name] || "No explanation available.";
                this.mainCharacters[c_name].abbreviation = j.abbreviation || '';

                //  Als er precies 1 resultaat is óf een geldig object is binnengekomen
              } else if ((filteredResults.length == 1) || (Object.keys(filteredResults).length > 0)) {
                this.mainCharacters[c_name] = filteredResults;
                this.mainCharacters[c_name].disorder = j.disorder;
                this.mainCharacters[c_name].explanation = explanationMap[c_name] || "No explanation available.";
                this.mainCharacters[c_name].abbreviation = j.abbreviation || '';

                // Geen bruikbare resultaten in de API, maar toon wel naam en disorder
              } else {
                console.log(c_name, "found has no results : ", filteredResults);
                this.mainCharacters[c_name] = { name: c_name, disorder: j.disorder };
              }

              // De API retourneert helemaal geen match (count = 0)
            } else {
              console.log("No character in API found for ", c_name);
            }
          });
        }
      }

      // Zet object om naar array voor filtering
      this.mainCharacters = Object.values(this.mainCharacters).map(c => toRaw(c));
      this.filteredCharacters = this.mainCharacters;

      // Verzamel en sorteer alle unieke disorders
      const disorders = characterDisorders.map(c => c.disorder);
      this.allDisorders = [...new Set(disorders)].sort();

      this.dateLoaded = true;

      // console.log(this.mainCharacters);
    },

    // Filter op stoornis of afkorting
    filterCharacters() {
      const input = this.searchQuery.trim().toLowerCase();
      this.selectedButton = '';

      if (input === '') {
        this.filteredCharacters = this.mainCharacters;
        this.searchSuggestions = this.allDisorders.slice(0, 5); // eerste suggesties
      } else {
        this.filteredCharacters = this.mainCharacters.filter(character =>
          character.disorder.toLowerCase().includes(input) ||
          character.abbreviation?.toLowerCase().includes(input)
        );

        this.searchSuggestions = this.allDisorders.filter(disorder =>
          disorder.toLowerCase().includes(input)
        );
      }
    },

    // Filter op character-naam
    filterCharacters2() {
      if (this.searchQuery2.trim() === '') {
        this.filteredCharacters = this.mainCharacters;
      } else {
        this.filteredCharacters = this.mainCharacters.filter(character =>
          character.name.toLowerCase().includes(this.searchQuery2.toLowerCase())
        );
      }

      // console.log("Filtered characters:", this.filteredCharacters);
    }
  }
}

</script>
<style>
/* === NO RESULTS & LOADING === */

.no-results {
  text-align: center;
  font-family: 'Poppins', sans-serif;
  color: #1E3A8A;
  font-size: 1rem;
  margin-top: 40px;
}

.no-results-img {
  width: 120px;
  height: auto;
  margin-bottom: 12px;
}

.loading {
  text-align: center;
  position: relative;
  margin-top: 20px;
}

.loading-img {
  width: 250px;
  max-width: 100%;
  height: auto;
  display: block;
  margin: 140px auto 70px auto;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading-text {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  color: #1E3A8A;
  position: absolute;
  top: -8%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  overflow: hidden;
}

/* === CHARACTER DISPLAY === */

.character-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
}

/* === ZOEKBALKEN & KNOPPEN === */

.zoekbalk-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 10px 0;
}

.zoekbalk {
  width: 200px;
  height: 50px;
  border-radius: 10px;
  text-align: center;
  color: #1E3A8A;
  transition: all 0.3s ease;
  margin: 40px 0 50px 20px;
}

.zoekbalk:hover,
.zoekbalk:focus {
  border-color: #1E3A8A;
  box-shadow: 0 0 10px #1E3A8A;
  transform: scale(1.03);
  outline: none;
}

.zoekbalk::placeholder {
  color: #94A3B8;
  transition: color 0.3s ease;
}

.zoekbalk:hover::placeholder {
  color: #1E3A8A;
}

.zoekbalk-wrapper {
  position: relative;
  display: inline-block;
}

.random-knop {
  width: 200px;
  height: 50px;
  border-radius: 10px;
  text-align: center;
  color: #1E3A8A;
  background-color: white;
  border: 2px solid #94A3B8;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin: 40px 0 50px 20px;
  cursor: pointer;
}

.random-knop:hover {
  box-shadow: 0 0 12px #1E3A8A, 0 0 18px #1E3A8A;
  color: #1E3A8A;
  border-color: #1E3A8A;
  transform: scale(1.05);
}

.random-knop.active {
  background-color: #1E3A8A;
  color: white;
  border: 2px solid #1E3A8A;
}

/* === TINKERBELL & TOOLTIP === */

.tinkerbell-wrapper {
  position: absolute;
  top: 0px;
  right: -10px;
  width: 35px;
  cursor: pointer;
  z-index: 3;
}

.tinkerbell {
  width: 100px;
  height: auto;
  position: relative;
  top: -10px;
  right: 40px;
  transition: transform 0.2s ease, opacity 0.4s ease;
  opacity: 1;
}

.tinkerbell.fade-out {
  opacity: 0;
}

.tinkerbell.dust {
  width: 120px;
  top: -45px;
}

.tinkerbell:hover {
  transform: scale(1.1);
}

.tooltip {
  display: none;
  position: absolute;
  top: 20%;
  right: 160%;
  transform: translateY(-50%);
  background: #1E3A8A;
  color: white;
  font-size: 0.75rem;
  padding: 6px 10px;
  border-radius: 8px;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  font-family: 'Poppins', sans-serif;
  text-align: left;
  z-index: 10;
}

.tooltip:hover {
  background-color: white;
  border: 2px solid #1E3A8A;
  color: #1E3A8A;
}

.tinkerbell-wrapper:hover .tooltip {
  display: block;
}

/* === SUGGESTIEBOX === */

.suggestie-box {
  position: absolute;
  top: 5%;
  right: 120%;
  transform: translateY(-50%);
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  z-index: 10;
  background: none;
  border: none;
  box-shadow: none;
}

.suggestie-box span {
  background-color: white;
  color: #1E3A8A;
  border: 1px solid #1E3A8A;
  border-radius: 999px;
  padding: 5px 10px;
  cursor: pointer;
  width: 200px;
  text-align: center;
  font-size: 0.5rem;
  transition: all 0.2s ease;
}

.suggestie-box span:hover {
  background-color: #1E3A8A;
  color: white;
  transform: scale(1.05);
}
</style>
