import { getCart } from '../service/cart'

export default {
  async updateCart (ctx) {
    const { data } = await getCart()
    ctx.commit('addCart', {
      count: data.length || 0
    })
  },
  tipAction: (ctx, newData) => {
    ctx.commit('tipMutation', newData)
  },
  numAction: (ctx, newData) => {
    ctx.commit('numMutation', newData)
  }
}
