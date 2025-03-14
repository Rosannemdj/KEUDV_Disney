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

  async mounted() {
    await this.fetchdisorder();
    console.log(this.Maincharacters);
  },

  methods: {

    async fetchdisorder() {
      for (var j of characterDisorders) {
        const c_name = j.name;
        const c_film = j.film;
        if (c_name != null && c_name != "") {

          const url = `https://api.disneyapi.dev/character?name=${c_name}`;
          await fetch(url).then(response => response.json()).then(resultFromApi => {
            // console.log("API result for: ", c_name, resultFromApi);
            var filteredResults = Object.values(resultFromApi.data).filter(character => character.name == j.name);
            if (filteredResults.length > 1) {
              const m = Math.max(...filteredResults.map(c => {
                if (c.films.length > 0) {
                  return c.films.length
                }
              }));
              if (m != NaN) {
                filteredResults = Object.values(filteredResults).filter(character => character.films.length == m);
                this.Maincharacters[c_name] = filteredResults;
                this.Maincharacters[c_name].disorder = j.disorder;
              } else console.log("invalid", j.name)
            } else if (filteredResults.length == 1) {
              this.Maincharacters[c_name] = filteredResults;
              this.Maincharacters[c_name].disorder = j.disorder;
            } else {
              this.Maincharacters[c_name] = { name: c_name, disorder: j.disorder };
            }
          })





          // const filteredResults = resultFromApi.data.filter(character => character.film === c_film);
          //     if (filteredResults.length > 0) {

          //         this.Maincharacters[c_name] = filteredResults[0];
          //         this.Maincharacters[c_name].disorder = j.disorder; 
          //     } else {
          //         this.Maincharacters[c_name] = { name: c_name, disorder: j.disorder, film: j.film };
          //     }



          //     console.log(resultFromApi)
          //     if (resultFromApi.info.count > 0) {
          //     this.Maincharacters[j.name]= resultFromApi.data;
          //     this.Maincharacters[j.name]["disorder"]= j.disorder;
          //     } else {
          //         this.Maincharacters[j.name]= {name: j.name, disorder: j.disorder };
          //     }
          // })


        }

        //meerdere hits dus dan geen naam of plaatje

      }
      console.log(this.Maincharacters)
    },


    displayCharacters() {
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