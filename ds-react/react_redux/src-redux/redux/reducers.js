/**
 * 包含 n 个reducer 函数的模块
 */
import {INCREMENT, DECREMENT} from './action-types.js'

export default function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.data
    case DECREMENT:
      return state - action.data
    default:
      return state
  }
}