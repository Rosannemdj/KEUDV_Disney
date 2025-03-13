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
    };
  },
  mounted() {
    this.fetchAndFilterCharacters();
  },
  methods: {
    fetchAndFilterCharacters() {
      fetch('https://api.disneyapi.dev/character?page=5&pageSize=50')
        .then(response => response.json())
        .then(resultFromApi => {
          this.allCharacters = resultFromApi.data;  
          this.filterCharacters();
        })
    },
    filterCharacters() {
      const disorderMap = new Map(characterDisorders.map(item => [item.name, item.disorder]));
      this.filteredCharacters = this.allCharacters.filter(character => 
        disorderMap.has(character.name)
      ).map(character => ({
        ...character,
        disorder: disorderMap.get(character.name)
      }));
    }
  }
}
</script>