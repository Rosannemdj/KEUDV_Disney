<script>
import MainCharacter from './MainCharacter.vue';

export default {
  data() {
    return {
      characters: [], // Hier worden alle karakters geladen
      searchQuery: '', // De zoekterm die de gebruiker invoert
      filteredCharacters: [] // De gefilterde lijst van karakters om te tonen
    };
  },
  mounted() {
    this.fetchCharacters();  // Laad de karaktergegevens bij het laden van de component
  },
  methods: {
    fetchCharacters() {
      import('@/assets/characterdisorder.json')
        .then(data => {
          this.characters = data;
          this.filteredCharacters = this.characters; // Initieel worden alle karakters getoond
          console.log("Characters loaded:", this.characters);
        })

    },
    filterCharacters() {
      if (this.searchQuery.trim() === '') {
        this.filteredCharacters = this.characters;
      } else {
        this.filteredCharacters = this.characters.filter(character =>
          character.disorder.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    }
  }
}
</script>


<template>
  <div>
    <input type="text" v-model="searchQuery" placeholder="Zoek op stoornis..." @input="filterCharacters">
    <ul>
      <li v-for="character in filteredCharacters" :key="character.name">
        <div>{{ character.name }} - {{ character.disorder }}</div>
      </li>
    </ul>
  </div>
</template>
