import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      character: [],
      info: {}
    }
  },
  mutations: {
    updateCharacters(state, newCharacter) {
      state.character = newCharacter.results;
      state.info = newCharacter.info;
    },
    nextCharacters(state, addCharacter) {
      state.character = state.character.concat(addCharacter.results);
      state.info = addCharacter.info
    }
  },
  actions: {
    async fetchFilteredCharacters(context, parametr = '') {
      await fetch(`https://rickandmortyapi.com/api/character/${parametr}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          context.commit("updateCharacters", data);
        });
    },
    async nextCharacters(context, parametr = ``) {
      await fetch(parametr)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          context.commit("nextCharacters", data);
        });
    }
  },
});
