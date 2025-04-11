<script setup>
import ColorThief from 'colorthief';
</script>
<template>

  <!--  Container van één kaart met flip-functionaliteit -->
  <div class="character character-card box" :class="{ flipped: isFlipped }" @click="flipCard">

    <!-- VOORZIJDE van de kaart -->
    <div class="front" :style="{ backgroundColor: color }">

      <!--  Afbeelding van het karakter -->
      <img :src="image" alt="" class="plaatje" :id="'p' + id" @load="dominantColor" crossOrigin="anonymous" />
      <!--
  - :src="image" → Dynamische URL van het character-plaatje.
  - :id="'p' + id" → Maakt het ID uniek voor elke kaart, handig voor kleurdetectie.
  - @load="dominantColor" → Roept een methode aan om de dominante kleur uit het plaatje te halen zodra het geladen is.
  - crossOrigin="anonymous" → Nodig voor toegang tot pixeldata van externe images (CORS), vereist bij kleurdetectie.
-->

      <!--  Naam van het karakter -->
      <div class="character-name">
        <h3>{{ character }}</h3> <!-- Toon de naam van het karakter -->
      </div>

      <!-- Naam van de stoornis (disorder) -->
      <div class="character-name">
        <h5>{{ disorder }}</h5> <!-- Toon de gekoppelde stoornis -->
      </div>
    </div>

    <!-- ACHTERZIJDE van de kaart -->
    <div class="character back" :style="{ backgroundColor: color }">
      <h3>Explanation</h3> <!-- Titel voor uitleg -->
      <p class="disorder-explanation">
        {{ explanation }} <!-- De uitleg die hoort bij de disorder -->
      </p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'characterKart', // Naam van het component

  // Props die van buitenaf worden meegegeven aan het component
  props: {
    character: String,     // Naam van het Disney karakter
    image: String,         // URL van het plaatje van het karakter
    disorder: String,      // De bijbehorende psychische stoornis
    id: Number,            // Uniek ID voor het karakter (nodig voor kleurdetectie)
    explanation: String,   // Uitleg over de stoornis (achterkant kaart)
  },

  // Lokale data van het component
  data() {
    return {
      color: 'rgb(255,255,255)', // Standaard achtergrondkleur van de kaart
      isFlipped: false,          // Boolean om bij te houden of de kaart omgedraaid is
    }
  },

  methods: {
    // Methode om de dominante kleur uit het plaatje te halen met ColorThief
    dominantColor() {
      const img = document.querySelector(`#p${this.id}`); // Selecteer het juiste plaatje via dynamisch ID

      if (img == null) {
        // Als er geen afbeelding is gevonden, geef standaard wit
        this.color = 'rgb(255,255,255)';
      } else {
        // Gebruik de ColorThief library om de dominante kleur op te halen
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        this.color = `rgb(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]})`;
      }
    },

    //  Methode om de kaart te flippen
    flipCard() {
      if (this.isFlipped) {
        // Als deze kaart al flipped is, draai hem terug
        this.isFlipped = false;
      } else {
        // Eerst alle andere kaarten laten terugdraaien via een CustomEvent
        window.dispatchEvent(new CustomEvent("resetFlip", { detail: this.id }));

        // Daarna deze kaart omdraaien
        this.isFlipped = true;
      }
    },

    //  Methode om de kaart weer terug te draaien als een andere wordt aangeklikt
    resetFlipped(event) {
      // Alleen terugflippen als dit NIET de aangeklikte kaart is
      if (event.detail !== this.id) {
        this.isFlipped = false;
      }
    },
  },

  mounted() {
    // Voeg globale event listener toe om andere kaarten te laten reageren op flip
    window.addEventListener("resetFlip", this.resetFlipped);
  },

  beforeUnmount() {
    // Verwijder event listener wanneer het component wordt opgeruimd
    window.removeEventListener("resetFlip", this.resetFlipped);
  },
}
</script>

<style>
/* === VOOR- EN ACHTERZIJDE KAART === */

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  color: white;
  backface-visibility: hidden;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    0 6px 20px rgba(0, 0, 0, 0.19);
}

.front {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
}

.back {
  transform: rotateY(180deg);
}

/* Flippen van de kaart */
.box.flipped,
.flipped {
  transform: rotateY(180deg);
}

/* Hover-effect voor glowy voorkant */
.front:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px #1E3A8A;
  cursor: pointer;
}


/* === KAARTCONTAINER === */

.character-card {
  position: relative;
  transform-style: preserve-3d;
  margin-bottom: 10px;
}

.character {
  text-align: center;
  width: 180px;
  height: 350px;
  border-radius: 10%;
  color: white;
  font-weight: bold;
  perspective: 1000px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}


/* === plaatje van het karakter === */

.plaatje {
  width: 100%;
  height: 200px;
  object-fit: fill;
  display: block;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}


/* === TEKST OP DE VOORZIJDE === */

.character-name {
  padding: 6px;
  text-align: center;
}

.character-name h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 4px 0;
  color: white;
}

.character-name h5 {
  font-size: 1rem;
  font-weight: normal;
  margin: 4px 0;
  color: white;
}


/* === ACHTERKANT: UITLEG === */

.back h3 {
  margin: 10px;
  font-weight: bold;
}

.disorder-explanation {
  margin: 10px;
}
</style>
