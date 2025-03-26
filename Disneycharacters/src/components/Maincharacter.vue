<!-- eslint-disable vue/multi-word-component-names -->
<!-- This component fetches the data from the Disney API and the characterdisorder.json file. It then displays the main
characters with their respective disorders. If the character is not found in the API, it will display "No disorder
recorded".-->
<script setup>
import characterDisorders from '../assets/characterdisorder.json';
import { toRaw } from 'vue';
import CharacterKart from './characterKart.vue';
</script>

<template>
  <input v-if="dateLoaded" type="text" v-model="searchQuery" placeholder="Zoek op stoornis..." @input="filterCharacters"
    id="zoekbalk">
  <input v-if="dateLoaded" type="text" v-model="searchQuery2" placeholder="Zoek op karakter..."
    @input="filterCharacters2" id="zoekbalk">
  <div v-if="dateLoaded" class="character-container">
    <div v-for="character in filteredCharacters" :key="character.id" class="character">
      <character-kart :character="character.name" :id="character._id" :disorder="character.disorder"
        :image="character.imageUrl"></character-kart>
    </div>

  </div>

  <div v-else class="loading">
    <img src="../assets/steamb-boat-mickei.gif" alt="Mickey Mouse Steamboat Willie 1928 GIF" />
  </div>

</template>
<script>
export default {

  data() {
    return {
      mainCharacters: {},
      filteredCharacters: [],
      dateLoaded: false,
      searchQuery: '',
      searchQuery2: '',
    };

  },

  async mounted() {
    await this.fetchdisorder();
  },

  methods: {

    async fetchdisorder() {
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

                this.mainCharacters[c_name] = mostFilmsCharacter;
                this.mainCharacters[c_name].disorder = j.disorder;

              } else if ((filteredResults.length == 1) || (Object.keys(filteredResults).length > 0)) {
                //console.log(c_name, "found has only 1 list of character ", filteredResults)
                this.mainCharacters[c_name] = filteredResults;
                this.mainCharacters[c_name].disorder = j.disorder;
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
      this.dateLoaded = true
    },
    //dit is het stukje dat de input vergelijkt met de data van de api en de json file voor de stoornissen
    filterCharacters() {
      if (this.searchQuery.trim() === '') {
        this.filteredCharacters = this.mainCharacters; //geen zoekopdracht, toon alle karakters
      } else {
        this.filteredCharacters = this.mainCharacters.filter(character =>
          character.disorder.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      console.log("Filtered characters:", this.filteredCharacters);
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
<style scoped>
.character-container {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  gap: 20px;
}

/* zorgt er voor dat de karakters netjes naar elkaar weergeven worden */

#zoekbalk {
  margin-top: 200px;
  margin-bottom: 100px;
  width: 200px;
  height: 50px;
  margin-left: 10px;
}

.loading {
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;

}
</style>
