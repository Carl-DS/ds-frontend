import React, { Component } from "react";

export default class News extends Component {
  state = {
    newsArr: ["news001", "news002", "news003"],
  };
  render() {
    const { newsArr } = this.state;
    return (
      <div>
        <ul>
          {newsArr.map((n, index) => (
            <li key={index}>{n}</li>
          ))}
        </ul>
      </div>
    );
  }
}
