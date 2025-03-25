<script setup>
import MainCharacter from './components/MainCharacter.vue'
</script>

<template>
  <header>
    <img src="./assets/images/logo.png" alt="Disney logo" id="logo" />
    <h1>Disney characters </h1>
  </header>

  <MainCharacter />
</template>

<script>
export default {
  data() {
    return {
      characters: [],
      currentCharacter: 0,
    }
  },
  methods: {
    nextCharacter() {
      this.currentCharacter++
      if (this.currentCharacter >= this.characters.length) {
        this.currentCharacter = 0
      }
    },
    previousCharacter() {
      console.log('previousCharacter')
      this.currentCharacter--
      if (this.currentCharacter < 0) {
        this.currentCharacter = this.characters.length - 1
      }
    },
  },
}
</script>

<style scoped>
#container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  justify-content: center;
  align-items: center;
  /* flex-wrap: wrap; */
  gap: 15px;
  margin-top: 200px;
  margin-left: -300px;
}

header {
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-width: 800px;
  grid-gap: 20px;
}

header img {
  width: 150px;
  height: 100px;
}

header h1 {
  font-size: 20px;
  font-weight: bold;
  margin-top: 40px;
}

#zoekbalk {
  margin-top: 200px;
  justify-content: center;
}
</style>
