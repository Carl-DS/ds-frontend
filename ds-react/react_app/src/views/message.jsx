import React, { Component } from "react";
import {Route, Link, NavLink} from 'react-router-dom';
import MessageDetail from './message-detail'
import MyNavLink from "../components/MyNavLink";

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
    }, 100);
  }

  showDetail = (id) => {
    this.props.history.push(`/home/message/detail/${id}`)
  }

  showDetail2 = (id) => {
    this.props.history.replace(`/home/message/detail/${id}`)
  }

  back = () => {
    this.props.history.goBack();
  }

  forward = () => {
    this.props.history.goForward();
  }

  render() {
    const { messages } = this.state;
    return (
      <>
        <ul>
          {messages.map((m, index) => (
            <li key={index}>
              {/* <a href={`/home/message/detail/${m.id}`}>{m.title}</a> */}
              {/* <Link to={`/home/message/detail/${m.id}`}>{m.title}</Link> */}
              {/* <NavLink to={`/home/message/detail/${m.id}`}>{m.title}</NavLink> */}
              <MyNavLink to={`/home/message/detail/${m.id}`}>{m.title}</MyNavLink>
              &nbsp;&nbsp; <button onClick={()=>{this.showDetail(m.id)}}>push查看</button>
              &nbsp;&nbsp; <button onClick={()=>{this.showDetail2(m.id)}}>replace查看</button>
            </li>
          ))}
        </ul>
        <p>
          <button onClick={this.back}>回退</button>
          <button onClick={this.forward}>前进</button>
        </p>
        <hr/>
        <Route path='/home/message/detail/:id' component={MessageDetail} />
      </>
    );
  }
}
