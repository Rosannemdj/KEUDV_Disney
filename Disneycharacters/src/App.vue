<script setup>
import characterKart from './components/characterKart.vue'
import MainCharacter from './components/MainCharacter.vue'
</script>

<template>
  <header>
    <img src="./assets/images/logo.png" alt="Disney logo" />
    <h1>Disney characters</h1>
  </header>

  <main>
    <div id="container">
      <template v-for="character in characters" :key="character.character">
        {{ character.name }}
        <characterKart :character="character.name" :image="character.imageUrl" />
      </template>
    </div>
    <MainCharacter />
    <!-- <h3>highlight</h3>
    <characterKart
      :backgroundcolor="characters[currentCharacter].backgroundcolor"
      :character="characters[currentCharacter].character"
      :image="characters[currentCharacter].image"
    />
   <button @click="previousCharacter()">Vorig</button>
    <button @click="nextCharacter()">Volgende</button> -->
  </main>
</template>

<script>
export default {
  data() {
    return {
      characters: [],
      currentCharacter: 0,
    }
  },
  onMounted() {
    console.log('onMounted')
  },
  mounted() {
    console.log("sdfjkldsjfkldsf");
    fetch('https://api.disneyapi.dev/character?page=5&pageSize=50')
      .then(response => response.json())
      .then(resultFromApi => {
        console.log(resultFromApi.data)
        this.characters = resultFromApi.data
      })
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
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 200px;
  margin-left: -300px;
}

header {
  display: inline-flex;
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
</style>
