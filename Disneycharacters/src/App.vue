<script setup>
import MainCharacter from './components/MainCharacter.vue'
</script>

<template>
  <header>
    <div class="site-header">
      <img src="./assets/images/logo.png" alt="Disney logo" id="logo" />
      <h1>Disney Characters</h1>
      <p class="header-subtitle">
        Discover the hidden layers of your favorite characters</p>
    </div>
  </header>

  <MainCharacter />
</template>


<style scoped>
.site-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 0px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}


#logo {
  max-width: 120px;
  height: auto;
  margin-bottom: 10px;
}

.site-header h1 {
  font-size: 2rem;
  color: #1E3A8A;
  margin-bottom: 10px;
}

.header-subtitle {
  font-size: 1.1rem;
  font-weight: 400;
  color: #1E3A8A;
  max-width: 600px;
  line-height: 1.5;
}
</style>
