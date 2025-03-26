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


<style scoped>
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
