import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default class Main extends Component {
  static propTypes = {
    searchName: PropTypes.string.isRequired,
  };

  state = {
    initView: true,
    loading: false,
    users: null,
    errorMsg: null,
  };

  // 当组件接收到新的属性时回调
  componentWillReceiveProps(newProps) {
    // 指定了新的 searchName, 需要请求
    const { searchName } = newProps;
    // 发请求之前，更新状态（请求中）
    this.setState({
      initView: false,
      loading: true,
    });
    // 发 ajax 请求
    const url = `https://api.github.com/search/users?q=${searchName}`;
    axios
      .get(url)
      .then((res) => {
        console.log("then=>", res);
        // 得到响应数据
        let data = res.data;
        const users = data.items.map((d) => ({
          name: d.login,
          avatarUrl: d.avatar_url,
          url: d.html_url,
        }));
        // 更新状态（成功）
        this.setState({
          loading: false,
          users: users,
        });
      })
      .catch((err) => {
        console.log("catch=>", err);
        // 更新状态（失败）
        this.setState({
          loading: false,
          errorMsg: err.message,
        });
      });
  }

  render() {
    const { initView, loading, users, errorMsg } = this.state;
    const { searchName } = this.props;
    if (initView) {
      return <h2>请输入关键字进行搜索</h2>;
    } else if (loading) {
      return <h2>正在请求中...</h2>;
    } else if (errorMsg) {
      return <h2>{errorMsg}</h2>;
    } else {
      return (
        <div className="row">
          {users.map((user, index) => (
            <div className="card" key={index}>
              <a href={user.url} target="_blank">
                <img src={user.avatarUrl} style={{ width: 100 }} />
              </a>
              <p className="card-text">{user.name}</p>
            </div>
          ))}
        </div>
      );
    }
  }
}
