import { INCREMENT, DECREMENT } from "./action-types.js";
/**
 * 包含所有　action creator
 */
// 增加
export const increment = (number) => ({type: INCREMENT, data: number});
export const decrement = (number) => ({type: DECREMENT, data: number});