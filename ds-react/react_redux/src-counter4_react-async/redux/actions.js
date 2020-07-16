import { INCREMENT, DECREMENT } from "./action-types.js";
/**
 * 包含所有　action creator
 */
// 增加
export const increment = (number) => ({type: INCREMENT, data: number});
export const decrement = (number) => ({type: DECREMENT, data: number});

// 异步 action
export const incrementAsync = (number) => {
  return dispatch => {
    // 异步的代码
    setTimeout(() =>{
      // 1秒之后才去分发一个增加的 action
      console.log("1秒之后才去分发一个增加的 action")
      dispatch(increment(number));
    }, 1000)
  }
}