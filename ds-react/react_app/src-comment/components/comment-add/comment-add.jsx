import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CommentAdd extends Component {
  constructor(props) {
    super(props);

    // 非箭头形式，表示函数是后来添加的，这时需要在构造函数中绑定 this 对象
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  // handleSubmit () {

  // }

  static propTypes = {
    addComment: PropTypes.func.isRequired,
  };

  state = {
    username: "",
    content: "",
  };

  // 箭头函数形式则不需要再绑定 this
  // 箭头函数没有自己的对象，则看整个全局看外围而外围刚好是组件对象
  handleSubmit = () => {
    // 收集数据,并封装成 comment 对象
    const comment = this.state;
    // 更新状态，数据在哪个组件，更新数据的行为就应该定义在哪个组件
    this.props.addComment(comment);
    // 清除输入数据
    this.setState({
      username: "",
      content: "",
    });
  };

  handleNameChange = (event) => {
    const username = event.target.value;
    this.setState({ username });
  };

  handleContentChange = (event) => {
    const content = event.target.value;
    this.setState({ content });
  };

  render() {
    const { username, content } = this.state;
    return (
      <div className="col-md-4">
        <form className="form-horizontal">
          <div className="form-group">
            <label>用户名</label>
            <input
              type="text"
              className="form-control"
              placeholder="用户名"
              value={username}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="form-group">
            <label>评论内容</label>
            <textarea
              className="form-control"
              rows="6"
              placeholder="评论内容"
              value={content}
              onChange={this.handleContentChange}
            ></textarea>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button
                type="button"
                className="btn btn-default pull-right"
                onClick={this.handleSubmit}
              >
                提交
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
