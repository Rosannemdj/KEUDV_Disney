<script setup>
import ColorThief from 'colorthief';
</script>
<template>

  <div class="character" :style="{ backgroundColor: color }">
    <img :src="image" alt="Mario" class="plaatje" :id="'p' + id" @load="dominantColor" crossOrigin="anonymous" />
    <div class="character-name">
      <h2>{{ character }}</h2>
    </div>
    <div class="character-name">
      <h4> {{ disorder }}</h4>
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
      color: 'rgb(255,255,255)'
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

    }

  }
}
</script>

<style scoped>
.plaatje {
  width: 180px;
  height: 200px;
  object-fit: fill;
  position: center;
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;

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

}


.character-name {
  margin: 10px;
}
</style>
