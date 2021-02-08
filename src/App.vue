<template>
  <div id="app">
    <div class="container" style="padding: 35px 0">
      <div class="row">
        <div class="input-field col s12">
          <input
            v-on:keyup.enter="enter"
            v-model="search"
            placeholder="Введите имя персонажа"
            type="text"
            class="validate"
          />
          <label class="active" for="name">Персонажи</label>
        </div>
        <div class="col">
          <router-link
            to="/"
            class="card"
            v-for="character of getData"
            :key="character.id"
          >
            <div class="card-image">
              <img v-bind:src="character.image" />
              <span class="card-title">{{ character.name }}</span>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="this.$store.state.info.next === null" class="row" style="display: flex; justify-content: center;">
        <h2>Персонажи закончились</h2>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";

.col {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
}
.card {
  width: calc(33.33333% - 15px);
  margin-right: 15px;
}
.card-title {
  color: darkred !important;
  font-weight: 700 !important;
}

.card-content p {
  color: black !important;
}
</style>

<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  computed: {
    getData() {
      return this.$store.state.character;
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchFilteredCharacters");
  },
  methods: {
    enter() {
      this.$store.dispatch("fetchFilteredCharacters", `?name=${this.search}`);
      console.log(this.search);
    },
    async next() {
      this.$store.dispatch("nextCharacters", this.$store.state.info.next);
    },
    async scrollPage() {
       if(window.scrollY+1 >= document.documentElement.scrollHeight-document.documentElement.clientHeight) {
        if (this.$store.state.info.next) {
          await this.$store.dispatch("nextCharacters", this.$store.state.info.next);
        }
      }
    },
  },
  created() {
    window.addEventListener('scroll', this.scrollPage)
  },
  destroy() {
    window.removeEventListener('scroll', this.scrollPage)
  }
};
</script>
