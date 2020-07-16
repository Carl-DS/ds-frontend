import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * 组件开发第1步：
 * 引入静态内容，使之正常显示
 * 第2步：
 * 动态内容初始化
 */
export default class Counter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
  };

  increment = () => {
    // 1. 得到选择增加数量
    const number = this.select.value * 1;
    // 2. 调用 store 的方法更新状态
    this.props.increment(number);
  };

  decrement = () => {
    // 1. 得到选择增加数量
    const number = this.select.value * 1;
    // 2. 调用 store 的方法更新状态
    this.props.decrement(number);
  };

  incrementIfOdd = () => {
    // 1. 得到选择增加数量
    const number = this.select.value * 1;
    if (this.props.count % 2 === 1) {
      // 3.　更新状态
      // 2. 调用 store 的方法更新状态
      this.props.increment(number);
    }
  };

  incrementAsync = () => {
    // 1. 得到选择增加数量
    const number = this.select.value * 1;
    setTimeout(() => {
      // 2. 调用 store 的方法更新状态
      this.props.increment(number);
    }, 1000);
  };

  render() {
    let { count } = this.props;

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

