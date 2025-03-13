<template>
    <div>
      <ul>
        <li v-for="character in filteredCharacters" :key="character.id">
          {{ character.name }} - {{ character.disorder || 'No disorder recorded' }}
        </li>
      </ul>
    </div>
  </template>


<script>
import characterDisorders from '../assets/characterdisorder.json';

export default {
  data() {
    return {
      allCharacters: [],
      filteredCharacters: [],
      allCharactersWithDisorder: []
    };
  },

  mounted() {
    this.fetchAndFilterCharacters(5);
  },

  methods: {
    fetchAndFilterCharacters(page = 5) {

      fetch(`https://api.disneyapi.dev/character?page=${page}&pageSize=50`)
        .then(response => response.json())
        .then(resultFromApi => {
          this.allCharacters = resultFromApi.data;  

        
          if (resultFromApi.info.nextPage) { 
            this.fetchAndFilterCharacters(page + 1); 
            // this.filterCharacters();


        } 
        // else {
        //     this.filteredCharacters = allDisorderCharacters;
        //     console.log(allDisorderCharacters)
        //    }
          this.filterCharacters();
        })
    },


    filterCharacters(){
      const disorderMap = new Map(characterDisorders.map(item => [item.name, item.disorder]));
      let filteredCharacters = this.allCharacters.filter(character => 
        disorderMap.has(character.name)
      ).map((character) => {
        this.filteredCharacters.push({
          ...character,
          disorder: disorderMap.get(character.name)
        });
      });
    //   console.log(filteredCharacters);
    //   this.filteredCharacters.push(filteredCharacters);
    //   console.log(this.filteredCharacters);
    }
  }
}
</script>