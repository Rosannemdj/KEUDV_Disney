<template>
  <div class="character-container" >
    <div class="character" :style="{ backgroundColor: backgroundcolor }">
      <img :src=image alt="Mario" class="plaatje" />
      <h2>{{ character }}</h2>
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
  }
}
</script>

<style scoped>

.plaatje {
  width: 100px;
  position: absolute;

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
  padding-top: 90px;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  margin: 0 7.5px;
  transition: order 1s ease-in-out;
}
</style>
