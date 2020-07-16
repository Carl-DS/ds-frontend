import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import counter from "./reducers";

// 生成一个 store 对象
const store = createStore(
  counter, 
  composeWithDevTools(
    applyMiddleware(thunk), // 应用上异步中间件
  )
);
export default store;