const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => { // 创建一个http 服务
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world\n');
});

server.listen(port, hostname, () => {　// 监听指定端口并启动服务
    console.log(`Server running at http://${hostname}:${port}/`);
});