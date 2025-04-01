<script setup>
import ColorThief from 'colorthief';
</script>
<template>


  <div class="character character-card box" :class="{ flipped: isFlipped }" :style="{ backgroundColor: color }"
    @click="flipCard">
    <div class="front">
      <img :src="image" alt="" class="plaatje" :id="'p' + id" @load="dominantColor" crossOrigin="anonymous" />
      <div class="character-name">
        <h3>{{ character }}</h3>
      </div>
      <div class="character-name">
        <h5> {{ disorder }}</h5>
      </div>
    </div>
    <div class="character back" :style="{ backgroundColor: color }">
      <h3>Meer Informatie</h3>
      <p>Hier komt meer gedetailleerde informatie over het karakter.</p>

    </div>
  </div>

</template>

<script>
export default {
  name: 'characterKart',
  props: {
    character: String,
    image: String,
    disorder: String,
    id: Number,
  },
  data() {
    return {
      color: 'rgb(255,255,255)',
      isFlipped: false,
    }
  },
  methods: {
    dominantColor() {
      const img = document.querySelector(`#p${this.id}`);

      if (img == null) {
        this.color = 'rgb(255,255,255)'
      } else {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        this.color = `rgb(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]})`
      }

    },
    flipCard() {
      if (this.isFlipped) {
        // Als de kaart al flipped is, sluit hem dan
        this.isFlipped = false;
      } else {
        // Eerst andere kaarten resetten
        window.dispatchEvent(new CustomEvent("resetFlip", { detail: this.id }));

        // Dan deze kaart flipped maken
        this.isFlipped = true;
      }
    },
    resetFlipped(event) {
      // Alleen resetten als de geklikte kaart NIET deze is
      if (event.detail !== this.id) {
        this.isFlipped = false;
      }
    },
  },
  mounted() {
    // Luisteren naar het globale reset-event
    window.addEventListener("resetFlip", this.resetFlipped);
  },
  beforeUnmount() {
    // Event listener opruimen als component verdwijnt
    window.removeEventListener("resetFlip", this.resetFlipped);
  },
}
</script>

<style scoped>
.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 20px;
  color: white;
  backface-visibility: hidden;
}

.back {
  background-color: #e74c3c;
  transform: rotateY(180deg);
}

.box.flipped {
  transform: rotateY(180deg);
}


.plaatje {
  width: 180px;
  height: 200px;
  object-fit: fill;
  position: center;
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
}

.character-card {
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}


.flipped {
  transform: rotateY(180deg);
}


.character {
  text-align: center;
  height: auto;
  width: 180px;
  height: 350px;
  border-radius: 10%;
  color: white;
  font-weight: bold;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  perspective: 1000px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.character:hover {
  transform: translateY(-5px) scale(1.02);
  /* <– tilt omhoog + iets groter */
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.25),
    0 10px 30px rgba(0, 0, 0, 0.2);
  /* <– extra schaduw voor diepte */
}
</style>
