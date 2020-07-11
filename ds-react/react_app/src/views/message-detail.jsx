import React from 'react'

const allMessages = [
  { id: 1, title: "title01", content: "测试内容 01" },
  { id: 3, title: "title03", content: "测试内容 02" },
  { id: 5, title: "title05", content: "测试内容 03" },
]

export default function MessageDetail(props) {

  // 得到请求参数中的 id
  const {id} = props.match.params;
  // 查询得到对应的 message
  const message = allMessages.find((m) => m.id === id*1);

  return (
    <ul>
      <li>ID: {message.id}</li>
      <li>TITLE: {message.title}</li>
      <li>CONTENT: {message.content}</li>
    </ul>
  )
}
