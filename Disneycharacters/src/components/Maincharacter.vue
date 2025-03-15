<!-- This component fetches the data from the Disney API and the characterdisorder.json file. It then displays the main
characters with their respective disorders. If the character is not found in the API, it will display "No disorder
recorded".-->
<script setup>
import characterDisorders from '../assets/characterdisorder.json';
import { toRaw } from 'vue';
import CharacterKart from './characterKart.vue';
</script>

<template>
  <div>
    <ul v-if="dateLoaded">
      <li v-for="character in mainCharacters" :key="character.id">
        {{ console.log(character.name, character.imageUrl) }}
        {{ character.name }} - {{ character.disorder || 'No disorder recorded' }} - {{ character.imageUrl }}
        <character-kart :character="character" :image="character.imageUrl"></character-kart>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  data() {
    return {
      mainCharacters: {},
      filteredCharacters: [],
      dateLoaded: false
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
      console.log(this.mainCharacters)
      this.dateLoaded = true
    },


    //   console.log(filteredCharacters);
    //   this.filteredCharacters.push(filteredCharacters);
    //   console.log(this.filteredCharacters);
  }
}

</script>
