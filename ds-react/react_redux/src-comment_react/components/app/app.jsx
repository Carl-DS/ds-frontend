import React, { Component } from "react";
import CommentAdd from "../comment-add/comment-add";
import CommentList from "../comment-list/comment-list";

export default class App extends Component {
  // 在构造函数中初始化 state
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     comments: [
  //       {username: 'Tom', content: 'React 挺好的！'},
  //       {username: 'Jack', content: 'React太难了！'},
  //     ]
  //   }
  // }
  // 不使用构造函数的形式
  // 给组件对象(this)指定 state 属性
  state = {
    // comments: [
    //   { username: "Tom", content: "React 挺好的！" },
    //   { username: "Jack", content: "React太难了！还是学不会" },
    // ],
    comments: [],
  };

  componentdidMount() {
    // 模拟发送异步ajax 请求，获取数据
    setTimeout(() => {
      const comments = [
        { username: "Tom", content: "React 挺好的！" },
        { username: "Jack", content: "React太难了！还是学不会" },
      ];
      // 更新状态
      this.setState({ comments });
    }, 1000);
  }

  // 添加评论
  addComment = (comment) => {
    const { comments } = this.state;
    // 将元素放到数组的最前面
    comments.unshift(comment);
    // 更新状态
    this.setState({ comments });
  };

  // 删除指定评论
  deleteComment = (index) => {
    const { comments } = this.state;
    comments.splice(index, 1);
    // 更新状态
    this.setState({ comments });
  };

  render() {
    const { comments } = this.state;

    return (
      <div>
        <header className="site-header jumbotron">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h1>请发表对React的评论</h1>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <CommentAdd addComment={this.addComment} />
          <CommentList comments={comments} deleteComment={this.deleteComment} />
        </div>
      </div>
    );
  }
}
