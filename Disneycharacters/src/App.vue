<script setup>
import characterKart from './components/characterKart.vue';

import mario_png from './assets/images/mario.png';
import luigi_webp from './assets/images/luigi.webp';
import toad_png from './assets/images/toad.png';
</script>

<template>
  <header>
  </header>

  <main>
    <div id="container">
      <template v-for="character in characters" :key="character.character">
        <characterKart :backgroundcolor="character.backgroundcolor" :character="character.character"
          :image="character.image" />
      </template>
    </div>
    <h3>highlight</h3>
    <characterKart :backgroundcolor="characters[currentCharacter].backgroundcolor"
      :character="characters[currentCharacter].character" :image="characters[currentCharacter].image" />
    <button @click=previousCharacter() >Vorig</button>
    <button @click=nextCharacter() >Volgende</button>
  </main>
</template>
<script>

export default {
  data() {
    return {
      characters: [
        { backgroundcolor: "red", character: "Mario", image: mario_png },
        { backgroundcolor: "green", character: "Luigi", image: luigi_webp },
        { backgroundcolor: "rgb(226, 187, 70)", character: "Toad", image: toad_png }
      ],
      currentCharacter: 0
    }
  },
  onMounted() {
    console.log('onMounted');
  },
  methods : {
    nextCharacter(){
      this.currentCharacter++;
      if (this.currentCharacter >= this.characters.length) {
        this.currentCharacter = 0;
      }
    },
    previousCharacter(){
      console.log('previousCharacter');	
      this.currentCharacter--;
      if (this.currentCharacter < 0) {
        this.currentCharacter = this.characters.length - 1;
      }
    }
  }
}

</script>

<style scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}
</style>
