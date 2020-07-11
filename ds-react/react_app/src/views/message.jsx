import React, { Component } from "react";
import {Route} from 'react-router-dom';
import MessageDetail from './message-detail'

export default class Message extends Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    //　模拟发送ajax 请求异步获取数据
    setTimeout(() => {
      const messages = [
        { id: 1, title: "title01" },
        { id: 3, title: "title03" },
        { id: 5, title: "title05" },
      ];
      this.setState({ messages });
    }, 500);
  }

  render() {
    const { messages } = this.state;
    return (
      <>
        <ul>
          {messages.map((m, index) => (
            <li key={index}>
              <a href={`/home/message/detail/${m.id}`}>{m.title}</a>
            </li>
          ))}
        </ul>
        <hr/>
        <Route path='/home/message/detail/:id' component={MessageDetail} />
      </>
    );
  }
}
