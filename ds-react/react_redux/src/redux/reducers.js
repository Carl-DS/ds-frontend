/**
 * 包含 n 个reducer 函数的模块（根据老的 state和 action返回一个新的 state)
 */
import {ADD_COMMENT, DELETE_COMMENT, RECEIVE_COMMENTS} from './action-types'
import {combineReducers} from 'redux'
// const initComments = [
//   { username: "Tom", content: "React 挺好的！" },
//   { username: "Jack", content: "React太难了！还是学不会" },
// ];

const initComments = [];

// state 的原状态不能改变，要产生一个新的状态
function comments(state = initComments, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return [action.data, ...state];
    case DELETE_COMMENT:
      return　state.filter((comment, index) => index !==action.data);
    case RECEIVE_COMMENTS:
      return action.data;
    default:
      return state;
  }
}

export default combineReducers({
  comments, // 指定 reducer 对应的属性
})

// redux 向外暴露的是state个什么结构
// {comments:[], ...}