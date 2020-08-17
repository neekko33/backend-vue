import Vue from "vue";
import Vuex from "vuex";
import Menu from "@/store/modules/Menu";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    menu: Menu
  }
});
