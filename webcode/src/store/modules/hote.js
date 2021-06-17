import { getHotelInfo } from '@/api/hote'
import {getToken, setToken, removeToken} from '@/utils/auth'
import router, {resetRouter} from '@/router'

const state = {
  people_num: '',
  question_num: '',
  order_num: '',
  order_money: '',
  token: getToken()
}

const mutations = {
  SET_PEOPLE: (state, people_num) => {
    state.people_num = people_num
  },
  SET_QUESTION: (state, question_num) => {
    state.question_num = question_num
  },
  SET_ORDER: (state, order_num) => {
    state.order_num = order_num
  },
  SET_MONEY: (state, order_money) => {
    state.order_money = order_money
  }
}

const actions = {

  // 获取酒店盈利信息
  getHotelInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getHotelInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { people_num, question_num, order_num, order_money } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_PEOPLE', people_num)
        commit('SET_QUESTION', question_num)
        commit('SET_ORDER', order_num)
        commit('SET_MONEY', order_money)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
