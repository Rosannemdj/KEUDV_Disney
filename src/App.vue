<script setup>
import MainCharacter from './components/MainCharacter.vue'
import LogoVillian from './assets/images/logoVillian.png'
import { ref, watch, onMounted } from 'vue'


const currentTheme = ref('classic')


watch(currentTheme, (newTheme) => {
  document.body.className = '' // verwijder vorige class
  document.body.classList.add(newTheme) // voeg nieuwe toe
})

onMounted(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

  // Eerste keer instellen
  currentTheme.value = prefersDark.matches ? 'villain' : 'classic'
  document.body.classList.add(currentTheme.value)

  // Luisteren naar veranderingen
  prefersDark.addEventListener('change', (e) => {
    currentTheme.value = e.matches ? 'villain' : 'classic'
  })
})

</script>

<template>

  <div :class="['app', currentTheme]">

    <header>
      <div class="site-header">
        <div class="logo-title">
          <img src="./assets/images/logo.png" alt="Disney logo" id="logo" v-if="currentTheme === 'classic'" />
          <img src="./assets/images/logoVillian.png" alt="Disney Villain logo" id="logo-villian"
            v-if="currentTheme === 'villain'" />
          <h3>Disney Characters</h3>
        </div>
      </div>
    </header>

    <p class="header-subtitle">
      Discover the hidden layers of your favorite characters
    </p>

    <div class="theme-switcher">
      <label for="theme"></label>
      <select v-model="currentTheme" id="theme" class="theme-select">
        <option value="classic">Classic Theme</option>
        <option value="villain">Villain Theme</option>
      </select>
    </div>

    <MainCharacter :currentTheme="currentTheme" />
  </div>
</template>

<script>
import MainCharacter from './components/MainCharacter.vue'

export default {
  components: {
    MainCharacter
  },
  data() {
    return {
      currentTheme: 'classic'
    };
  }
}


</script>


<style>
/* === Algemene Header Styles === */

.site-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 30px 0 15px;
  font-family: 'Poppins', sans-serif;
}

.logo-title {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 3px;
}

#logo,
#logo-villian {
  max-width: 120px;
  height: auto;
  margin-bottom: 0;
}

#logo-villian {
  filter: drop-shadow(0 0 10px #e91e63);
}

.site-header h1 {
  font-size: 2rem;
  margin: 0;
  color: #1E3A8A;
}

.header-subtitle {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1E3A8A;
  max-width: 800px;
  line-height: 1.5;
  text-align: center;
  margin: 0 auto;
}

/* === Thema Containers === */

.app {
  transition: all 0.4s ease-in-out;
  min-height: 100vh;
}

.app.classic {
  background: linear-gradient(to bottom right, #a2c0f5, #f9f6ff);
  color: #1E3A8A;
}

.app.villain {
  background-color: #1a0a1f;
  color: #e91e63;
  font-family: 'IM Fell English SC', serif !important;
}

/* === Theme Switcher === */

.theme-switcher {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}

.theme-select {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 12px;
  font-size: 1rem;
  border-radius: 8px;
  background-color: white;
  border: 2px solid #1E3A8A;
  color: #1E3A8A;
  z-index: 1000;
  transition: all 0.3s ease;
}

.theme-switcher label {
  font-size: 1.5rem;
}

.app.villain .theme-select {
  background-color: #2b1c2f;
  color: white;
  border-color: #e91e63;
}

/* === Villain Thema Styling === */

body.villain .site-header h1,
body.villain .header-subtitle,
body.villain .no-results,
body.villain .loading-text {
  color: #e91e63 !important;
  font-family: 'IM Fell English SC', serif !important;
}

body.villain .zoekbalk {
  background-color: #2b1c2f;
  color: white;
  border: 2px solid #e91e63;
  font-family: 'IM Fell English SC', serif !important;
}

body.villain .zoekbalk:hover,
body.villain .zoekbalk:focus {
  border-color: #e91e63;
  box-shadow: 0 0 10px #e91e63;
  transform: scale(1.03);
  outline: none;
}

body.villain .zoekbalk::placeholder {
  color: #f8c1dd;
}

body.villain .zoekbalk:hover::placeholder {
  color: #ffffff;
}

body.villain .random-knop {
  color: #e91e63;
  background-color: white;
  border: 2px solid #1a0a1f;
  font-family: 'IM Fell English SC', serif !important;
}

body.villain .random-knop:hover {
  box-shadow: 0 0 12px #e91e63, 0 0 18px #e91e63 !important;
  color: #1a0a1f !important;
  border-color: #e91e63 !important;
  transform: scale(1.05) !important;
}

body.villain .random-knop.active {
  background-color: #e91e63;
  color: #1a0a1f;
  border: 2px solid #e91e63;
  box-shadow: 0 0 10px #e91e63;
}

body.villain .front:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 0 20px rgba(233, 30, 99, 0.5), 0 0 40px #e91e63;
  cursor: pointer;
}

/* === Tooltip en Suggesties === */

body.villain .tooltip {
  background-color: #e91e63;
  color: white;
  font-family: 'IM Fell English SC', serif !important;
}

body.villain .tooltip:hover {
  background-color: white;
  color: #e91e63;
  border: 2px solid #e91e63;
  box-shadow: 0 0 10px #e91e63;
}

body.villain .suggestie-box span {
  color: #e91e63 !important;
  font-family: 'IM Fell English SC', serif !important;
  font-size: 0.6rem;
}

body.villain .suggestie-box span:hover {
  color: white !important;
  background-color: #e91e63 !important;
  border: 2px solid #e91e63 !important;
  box-shadow: 0 0 10px #e91e63 !important;
  transform: scale(1.03) !important;
}
</style>
