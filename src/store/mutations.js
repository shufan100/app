export default {
  addCart (state, payload) {
    state.cartCount = payload.count
  },
  tipMutation (state, newData) {
    state.tip = newData
  },
  numMutation (state) {
    state.num++
  }
}
