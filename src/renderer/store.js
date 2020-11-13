import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  count: 122233
}

const mutations = {
  add(state) {
    state.count += 1
  },
  reduce(state) {
    state.count -= 1
  }
}

export default new Vuex.Store({
  state,
  mutations
})
