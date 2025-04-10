<script setup>
import ColorThief from 'colorthief';
</script>
<template>


  <div class=" character character-card box" :class="{ flipped: isFlipped }" @click="flipCard">
    <div class="front" :style="{ backgroundColor: color }">
      <img :src="image" alt="" class="plaatje" :id="'p' + id" @load="dominantColor" crossOrigin="anonymous" />
      <div class="character-name">
        <h3>{{ character }}</h3>
      </div>
      <div class="character-name">
        <h5> {{ disorder }}</h5>
      </div>
    </div>
    <div class="character back" :style="{ backgroundColor: color }">
      <h3>Explanation</h3>
      <p class="disorder-explanation">{{ explanation }}</p>

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
    explanation: String,
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
  color: white;
  backface-visibility: hidden;
}

.character-name {
  padding: 6px 6px;
  text-align: center;
}

.character-name h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
}

.character-name h5 {
  font-size: 1rem;
  font-weight: normal;
}

.character-name h3,
.character-name h5 {
  margin: 4px 0;
  color: white;
}

.back {
  transform: rotateY(180deg);
}


.box.flipped {
  transform: rotateY(180deg);

}

.front {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
}

.front:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px #1E3A8A;
  cursor: pointer;
}


.plaatje {
  width: 100%;
  height: 200px;
  object-fit: fill;
  /* position: center; */
  display: block;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}


.character-card {
  position: relative;
  /* transition: transform 1.5s; */
  transform-style: preserve-3d;
  margin-bottom: 10px;
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

.disorder-explanation {
  margin: 10px;
}

.back h3 {
  margin: 10px;
  font-weight: bold;
}
</style>
