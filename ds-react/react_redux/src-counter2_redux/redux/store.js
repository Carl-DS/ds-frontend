import { createStore } from "redux";

import counter from "./reducers";

// 生成一个 store 对象
const store = createStore(counter);
export default store;