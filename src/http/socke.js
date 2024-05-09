import io from "socket.io-client"
// 创建WebSocket对象并指定服务器地址
const socket = io('http://127.0.0.1:9091/');
socket.emit('message', 'Hello from client');
// // 监听连接成功事件
// socket.addEventListener('open', () => {
//   // console.log('Socket连接已建立');
  
//   // 向服务器发送消息
//   socket.send('Hello Server!');
// });

// // // 监听接收消息事件
// socket.on('message', (event) => {
//   // console.log('接收到服务器消息:', event);
// });

// // 监听连接关闭事件
// socket.addEventListener('close', () => {
//   // console.log('Socket连接已关闭');
// });

// // 监听连接错误事件
// socket.addEventListener('error', (error) => {
//   // console.error('Socket连接错误:', error);
// });

export default socket