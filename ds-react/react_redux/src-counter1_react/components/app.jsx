import React, { Component } from "react";

/**
 * 组件开发第1步：
 * 引入静态内容，使之正常显示
 * 第2步：
 * 动态内容初始化
 */
export default class App extends Component {
  state = {
    count: 0,
  };

  increment = () => {
    // 1. 得到选择增加数量
    const number = this.select.value * 1;
    // 2. 得到原本的 count 状态，并计算新的 count
    const count = this.state.count;
    // 3.　更新状态
    this.setState({ count: count + number });
  };

  decrement = () => {
    // 1. 得到选择增加数量
    const number = this.select.value * 1;
    // 2. 得到原本的 count 状态，并计算新的 count
    const count = this.state.count;
    // 3.　更新状态
    this.setState({ count: count - number });
  };

  incrementIfOdd = () => {
    // 1. 得到选择增加数量
    const number = this.select.value * 1;
    // 2. 得到原本的 count 状态，并计算新的 count
    const count = this.state.count;
    if (count % 2 === 1) {
      // 3.　更新状态
      this.setState({ count: count + number });
    }
  };

  incrementAsync = () => {
    // 1. 得到选择增加数量
    const number = this.select.value * 1;
    // 2. 得到原本的 count 状态，并计算新的 count
    const count = this.state.count;
    setTimeout(() => {
      // 3.　更新状态
      this.setState({ count: count + number});
    }, 1000)
  };

  render() {
    let { count } = this.state;

    return (
      <div>
        <p>click {count} times</p>
        <div>
          <select ref={(select) => (this.select = select)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          &nbsp;
          <button onClick={this.increment}>+</button>&nbsp;
          <button onClick={this.decrement}>-</button>&nbsp;
          <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
          <button onClick={this.incrementAsync}>increment async</button>&nbsp;
        </div>
      </div>
    );
  }
}
