<script setup>
import characterDisorders from '../assets/characterdisorder.json';
import { toRaw } from 'vue';
import CharacterKart from './characterKart.vue';
</script>

<template>

  <div class="zoekbalk-container" v-if="dateLoaded">
    <!-- Zoekbalk voor character -->
    <input type="text" v-model="searchQuery2" placeholder="Search by character..." @input="filterCharacters2"
      @focus="resetSelectedButton" class="zoekbalk" />

    <!-- Zoekbalk voor disorder met Tinkerbell OP de balk -->
    <div class="zoekbalk-wrapper">
      <input type="text" v-model="searchQuery" placeholder="Search by disorder..." @input="filterCharacters"
        @focus="clearSearchQuery" class="zoekbalk" />

      <!-- Tinkerbell op de zoekbalk -->
      <div class="tinkerbell-wrapper" @click="toggleSuggestieBox">
        <img ref="tinkerbellImg" :src="tinkerbellImageSrc" alt="Tinkerbell"
          :class="['tinkerbell', { 'dust': toonSuggestieBox }]">
        <!-- Tooltip alleen zichtbaar als suggesties niet aan staan -->
        <div v-if="!toonSuggestieBox" class="tooltip">
          Sometimes all you need is a little fairy help.
        </div>

        <!-- Suggesties op dezelfde plek als de tooltip -->
        <div v-if="toonSuggestieBox" class="suggestie-box left">
          <span v-for="disorder in randomDisorders" :key="disorder" @click="selectSuggestie(disorder)">
            {{ disorder }}
          </span>
        </div>
      </div>
    </div>


    <!-- Buttons -->
    <button @click="handleButtonClick('random')" :class="['random-knop', { active: selectedButton === 'random' }]">
      Random Character
    </button>
    <button @click="handleButtonClick('all')" :class="['random-knop', { active: selectedButton === 'all' }]">
      Show All Characters
    </button>
  </div>



  <div v-if="dateLoaded && filteredCharacters.length === 0" class="no-results">
    <img src="../assets/images/mickeymouse.png" alt="" class="no-results-img" />
    <p>Gosh! Mickey couldn’t find any characters that match your search!</p>
  </div>

  <div v-if="dateLoaded" class="character-container">
    <div v-for="character in filteredCharacters" :key="character.id" class="character">
      <character-kart :character="character.name" :id="character._id" :disorder="character.disorder"
        :image="character.imageUrl" :explanation="character.explanation"></character-kart>
    </div>
    <div>

    </div>
  </div>



  <div v-else class="loading">
    <img src="../assets/steamb-boat-mickei.gif" alt="Mickey Mouse Steamboat Willie 1928 GIF" class="loading-img" />
    <p class="loading-text">Mickey’s navigating the steamboat of info your way — the data boat is almost docked!</p>
  </div>
</template>

<script>
export default {
  props: {
    currentTheme: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      mainCharacters: {},
      filteredCharacters: [],
      dateLoaded: false,
      searchQuery: '',
      searchQuery2: '',
      selectedButton: '',
      allDisorders: [],
      randomDisorders: [],
      toonSuggestieBox: false,
    };

  },
  computed: {
    tinkerbellImageSrc() {
      if (this.toonSuggestieBox) {
        // Als de suggesties open staan: toon het dust-plaatje, ongeacht theme
        return '/src/assets/images/tinkerbellDust.png';
      } else if (this.currentTheme === 'villain') {
        // Villain theme zonder suggesties open
        return '/src/assets/images/tinkerbellVillain.png';
      } else {
        // Classic theme zonder suggesties
        return '/src/assets/images/tinkerbell.png';
      }
    }
  },

  async mounted() {
    await this.fetchdisorder();

  },

  methods: {
    clearSearchQuery() {
      this.searchQuery = '';
      this.filteredCharacters = this.mainCharacters;
      this.searchSuggestions = [];
      this.toonSuggestieBox = false;
    },
    getRandomDisorders() {
      const disorders = [...new Set(characterDisorders.map(c => c.disorder))];
      const shuffled = disorders.sort(() => 0.5 - Math.random());
      this.randomDisorders = shuffled.slice(0, 2);
    },
    toggleSuggestieBox() {
      this.toonSuggestieBox = !this.toonSuggestieBox;
      if (this.toonSuggestieBox) {
        this.getRandomDisorders();
      }
    },
    selectSuggestie(disorder) {
      this.searchQuery = disorder;       // vul het in de zoekbalk
      this.filterCharacters();           // filter direct de karakters
      this.toonSuggestieBox = false;     // verberg suggesties na klik (optioneel)
    },
    handleButtonClick(type) {
      this.selectedButton = type;
      if (type === 'random') {
        this.showRandomCard();
      } else if (type === 'all') {
        this.resetFilters();
      }
    },

    resetSelectedButton() {
      this.selectedButton = '';
    },

    showRandomCard() {
      const randomIndex = Math.floor(Math.random() * this.mainCharacters.length);
      const randomCharacter = this.mainCharacters[randomIndex];
      this.filteredCharacters = [randomCharacter];
    },
    resetFilters() {
      this.searchQuery = '';
      this.searchQuery2 = '';
      this.filteredCharacters = this.mainCharacters;
    },

    async fetchdisorder() {
      const explanationMap = {};
      characterDisorders.forEach(c => {
        explanationMap[c.name] = c.explanation;
      });
      for (var j of characterDisorders) {
        const c_name = j.name;
        if (c_name != undefined) {

          const url = `https://api.disneyapi.dev/character?name=${c_name}`;

          await fetch(url).then(response => response.json()).then(resultFromApi => {
            if (resultFromApi.info.count > 0) {
              // ervoor zorgen dat de naam van de character overeenkomt met de naam van de character in de API
              var filteredResults = resultFromApi.data

              // als de resultaten groter zijn dan 1, dan kijken welke character de meeste films heeft
              if (filteredResults.length > 1) {
                const mostFilmsCharacter = filteredResults.reduce((prev, current) => (prev.films.length > current.films.length) ? prev : current);
                //console.log(c_name, "found most films character ", mostFilmsCharacter)
                // console.log(mostFilmsCharacter.films?.[0])
                this.mainCharacters[c_name] = mostFilmsCharacter;
                this.mainCharacters[c_name].disorder = j.disorder;
                this.mainCharacters[c_name].explanation = explanationMap[c_name] || "No explanation available.";
                this.mainCharacters[c_name].abbreviation = j.abbreviation || '';

              } else if ((filteredResults.length == 1) || (Object.keys(filteredResults).length > 0)) {
                //console.log(c_name, "found has only 1 list of character ", filteredResults)
                this.mainCharacters[c_name] = filteredResults;
                this.mainCharacters[c_name].disorder = j.disorder;
                this.mainCharacters[c_name].explanation = explanationMap[c_name] || "No explanation available.";
                this.mainCharacters[c_name].abbreviation = j.abbreviation || '';
              } else {

                console.log(c_name, "found has no results : ", filteredResults)
                this.mainCharacters[c_name] = { name: c_name, disorder: j.disorder };
              }
            } else console.log("No character in API found for ", c_name)
          })

        }
      }
      this.mainCharacters = Object.values(this.mainCharacters).map(c => toRaw(c))
      this.filteredCharacters = this.mainCharacters;
      console.log(this.mainCharacters)
      const disorders = characterDisorders.map(c => c.disorder);
      this.allDisorders = [...new Set(disorders)].sort();
      this.dateLoaded = true
    },
    //dit is het stukje dat de input vergelijkt met de data van de api en de json file voor de stoornissen
    //
    filterCharacters() {
      const input = this.searchQuery.trim().toLowerCase();
      this.selectedButton = '';

      if (input === '') {
        this.filteredCharacters = this.mainCharacters;
        this.searchSuggestions = this.allDisorders.slice(0, 5); // top 5 suggesties als start
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

    filterCharacters2() {
      if (this.searchQuery2.trim() === '') {
        this.filteredCharacters = this.mainCharacters; //geen zoekopdracht, toon alle karakters
      } else {
        this.filteredCharacters = this.mainCharacters.filter(character =>
          character.name.toLowerCase().includes(this.searchQuery2.toLowerCase())
        );
      }
      console.log("Filtered characters:", this.filteredCharacters);
    }

  }
}

</script>
<style>
.no-results {
  text-align: center;
  font-family: 'Poppins', sans-serif;
  color: #1E3A8A;
  font-size: 1rem;
  margin-top: 40px;
}

.character-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
}

/* zorgt er voor dat de karakters netjes naar elkaar weergeven worden */

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
  /* donkerblauw */
  color: white;
  border: 2px solid #1E3A8A;
}

.loading {
  text-align: center;
  position: relative;
  margin-top: 20px;
}

.loading-img {
  width: 250px;
  /* of bijv. 100px of wat kleiner dan het nu is */
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

.no-results-img {
  width: 120px;
  height: auto;
  margin-bottom: 12px;
}


.zoekbalk-wrapper {
  position: relative;
  display: inline-block;
}

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
  transition: transform 0.2s ease;
  opacity: 1;
  transition: opacity 0.4s ease;
}

.tinkerbell.fade-out {
  opacity: 0;
}

.tinkerbell:hover {
  transform: scale(1.1);
}

.tinkerbell.dust {
  width: 120px;
  top: -45px;
}

/* Tooltip links van Tinkerbell */
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

/* Suggestiebox links van Tinkerbell */
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
