import React, { Component } from "react";
import Main from "./main";
import Search from "./search";

export default class App extends Component {

  state = {
    searchName: ''
  }
  setSearchName = (searchName) => {
    this.setState({searchName})
  }

  render() {
    const {searchName} = this.state;
    return (
      <div>
        <div className="container">
          <Search setSearchName={this.setSearchName}/>
          <Main searchName={searchName}/>
        </div>
      </div>
    );
  }
}
