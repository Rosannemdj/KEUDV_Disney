<template>
  <div class="character-container">
    <div class="character">
      <img v-if="image" :src="image" alt="Mario" class="plaatje" />
      <!-- <img v-else src="@/assets/images/sad_emoticon.jpg" alt="Sad emoticon" class="plaatje" /> -->
      <div class="character-name">
        <h2>{{ character.name }}</h2>
      </div>
      <!-- <div>
        <h2> {{ disorder }}</h2>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'characterKart',
  props: {
    backgroundcolor: String,
    character: String,
    image: String,
    disorder: String
  },
}
</script>

<style scoped>
.plaatje {
  width: 100px;
  position: absolute;
  border-radius: 10%;
}


.character-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 15px;
  flex-wrap: nowrap;
}

.character {
  /* Standaard achtergrondkleur, overschrijf dit per karakter */
  text-align: center;
  height: 100px;
  width: 150px;
  border-radius: 10%;
  padding-top: 80px;
  color: white;
  font-weight: bold;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  margin: 0 7.5px;

}
</style>
