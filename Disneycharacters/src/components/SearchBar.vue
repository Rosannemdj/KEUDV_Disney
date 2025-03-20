<script>
import MainCharacter from './MainCharacter.vue';
import characterDisorder from '@/assets/characterdisorder.json';

export default {
  data() {
    return {
      characters: [], // Hier worden alle karakters geladen
      searchQuery: '', // De zoekterm die de gebruiker invoert
      filteredCharacters: [] // De gefilterde lijst van karakters om te tonen
    };
  },
  mounted() {
    this.loadCharacters();
    console.log('mounted');
    // Laad de karaktergegevens bij het laden van de component
  },

  methods: {
    loadCharacters() {
      import('@/assets/characterdisorder.json')
        .then((data) => {
          this.characters = data.default; // Zorg ervoor dat je data.default gebruikt als dat nodig is
          this.filteredCharacters = this.characters;
          console.log("Characters loaded:", this.characters); // Log de geladen karakters
        })

    },
    filterCharacters() {
      console.log("Current search query:", this.searchQuery);
      console.log("Current characters:", this.characters);
      if (this.searchQuery.trim() === '') {
        this.filteredCharacters = this.characters; //geen zoekopdracht, toon alle karakters
      } else {
        this.filteredCharacters = this.characters.filter(character =>
          character.disorder.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      console.log("Filtered characters:", this.filteredCharacters);
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
