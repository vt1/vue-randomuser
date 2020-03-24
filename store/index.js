import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import urlUtil from '~/utils/url'
Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    users: [],
    gender: null,
    quantity: 5,
    seed: null
  },
  actions: {
    async loadUsers ({ commit, state, page }) {
      const url = page === undefined ? urlUtil.get(state.quantity, state.gender)
        : urlUtil.getWithPage(state.quantity, state.gender, state.seed, page)

      const { data } = await axios.get(url)

      if (state.seed === undefined || state.seed === null) {
        commit('setSeed', data.info.seed)
      }

      commit('initUsers', data.results)
    },
    async loadMoreUsers ({ commit, state }) {
      const { data } = await axios.get(urlUtil.getMoreUsers(state.gender))
      const user = data.results[0]
      const profileCardInfo = {
        nameTitle: 'Hi, my name is',
        emailTitle: 'My email is',
        dobTitle: 'My dob is',
        userTitle: 'Hi, my name is',
        userValue: null
      }
      user.profileCardInfo = profileCardInfo
      user.id = state.users[state.users.length - 1].id + 1
      state.users.push(user)
    }
  },
  mutations: {
    initUsers (state, users) {
      state.users = []
      let id = 0
      users.forEach((user) => {
        const profileCardInfo = {
          nameTitle: 'Hi, my name is',
          emailTitle: 'My email is',
          dobTitle: 'My dob is',
          userTitle: 'Hi, my name is',
          userValue: null
        }
        user.profileCardInfo = profileCardInfo
        user.id = id
        id++
        state.users.push(user)
      })
    },
    setUserTitle (state, userInfo) {
      state.users[userInfo.id].profileCardInfo.userTitle = userInfo.userTitle
    },
    setUserValue (state, userInfo) {
      state.users[userInfo.id].profileCardInfo.userValue = userInfo.userValue
    },
    setQuantity (state, quantity) {
      state.quantity = quantity
    },
    setGender (state, gender) {
      state.gender = gender
    },
    setSeed (state, seed) {
      state.seed = seed
    }
  },
  getters: {
    getUsers: (state) => {
      return state.users
    }
  }
})

export default store
