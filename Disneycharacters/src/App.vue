<script setup>
import MainCharacter from './components/MainCharacter.vue'
</script>

<template>
  <nav>
    <ul>
      <li>
        <img src="./assets/images/logo.png" alt="Disney logo" id="logo" />
      </li>
      <li>
        <h1>Disney characters </h1>
      </li>
    </ul>

  </nav>

  <MainCharacter />
</template>


<style scoped>
nav img {
  width: 150px;
  height: 100px;
}

nav h1 {
  font-size: 20px;
  font-weight: bold;
  margin-top: 40px;
}

ul {
  list-style-type: none;
}

li {
  float: left;
  margin-right: 10px;
}
</style>
