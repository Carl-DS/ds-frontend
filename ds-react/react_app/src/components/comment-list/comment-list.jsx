import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "../comment-item/comment-item";

import "./commentList.css";

export default class CommentList extends Component {
  // 给组件类指定属性
  // 如果不加 static 则会变成组件对象（this）
  static propTypes = {
    comments: PropTypes.array.isRequired,
    deleteComment: PropTypes.func.isRequired,
  };

  render() {
    const { comments, deleteComment } = this.props;
    const display = comments.length === 0 ? "block" : "none";
    return (
      <div className="col-md-8">
        <h3 className="reply">评论回复：</h3>
        <h2 style={{ display }}>暂无评论，点击左侧添加评论！！！</h2>
        <ul className="list-group">
          {comments.map((c, index) => (
            <CommentItem
              comment={c}
              key={index}
              index={index}
              deleteComment={deleteComment}
            />
          ))}
        </ul>
      </div>
    );
  }
}

// 建议在组件类指定属性
// CommentList.propTypes = {
//   comments: PropTypes.array.isRequired
// }
