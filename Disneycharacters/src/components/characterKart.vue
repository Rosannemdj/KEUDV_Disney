<script setup>
import ColorThief from 'colorthief';
</script>
<template>


  <div class="character character-card box" :class="{ flipped: isFlipped }" :style="{ backgroundColor: color }"
    @click="flipCard">
    <div class="character-front front">
      <img :src="image" alt="" class="plaatje" :id="'p' + id" @load="dominantColor" crossOrigin="anonymous" />
      <div class="character-name">
        <h3>{{ character }}</h3>
      </div>
      <div class="character-name">
        <h5> {{ disorder }}</h5>
      </div>
    </div>
    <div class="character character-back back" :style="{ backgroundColor: color }">
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
  /* display: flex;
    justify-content: center;
    align-items: center; */
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

.character-front,
.character-back {
  width: 100%;
  height: 100%;
  z-index: 2;
  backface-visibility: hidden;
  /* Verbergt de achterkant van de kaart wanneer deze niet naar de gebruiker is gericht */
}



.character-front {
  position: absolute;
}

.flipped {
  transform: rotateY(180deg);
}


.character {
  /* Standaard achtergrondkleur, overschrijf dit per karakter */
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
}
</style>
