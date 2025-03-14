<template>
    <div>
      <ul>
        <li v-for="character in Maincharacters" :key="character.id">
          {{ character.name }} - {{ character.disorder || 'No disorder recorded' }} - {{ character.imageUrl }}
        </li>
      </ul>
    </div>
  </template>


<script>
import characterDisorders from '../assets/characterdisorder.json';
export default {
  data() {
    return {
    Maincharacters: {},
    filteredCharacters: [],
     };
     
  },

   async mounted(){
    await this.fetchdisorder();
    console.log(this.Maincharacters);
  },

  methods:{
    
    async fetchdisorder(){
        for (var j of characterDisorders){
            const c_name = j.name
            console.log(c_name)
            if (c_name!=null && c_name!=""){
            
            const url = `https://api.disneyapi.dev/character?name=${c_name}`
            await fetch(url).then(response => response.json()).then(resultFromApi => {
                console.log(resultFromApi)
                if (resultFromApi.info.count > 0) {
                this.Maincharacters[j.name]= resultFromApi.data;
                this.Maincharacters[j.name]["disorder"]= j.disorder;
                } else {
                    this.Maincharacters[j.name]= {name: j.name, disorder: j.disorder};
                }
            })


        } 

        }
        console.log(this.Maincharacters)
    },
  

    displayCharacters(){
      const disorderMap = new Map(characterDisorders.map(item => [item.name, item.disorder]));
      let filteredCharacters = this.Maincharacters.map((character) => {
        this.filteredCharacters.push({
          ...character,
          disorder: disorderMap.get(character.name)
        });
      });
    //   console.log(filteredCharacters);
    //   this.filteredCharacters.push(filteredCharacters);
    //   console.log(this.filteredCharacters);
    }
  }
}
</script>