const express = require('express');
const cors = require('cors');
 
const app = express();
 
// 设置CORS头部
app.use(cors({
  origin: '*', // 只允许来自Vercel的请求
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // 允许cookies等认证信息
}));
//获取请求头
app.use(function (req, res, next) {
    // // console.log(req.headers);
    next();
})
// 处理前端请求
app.get('/api/weather', (req, res) => {
    // 获取请求参数
    const city = req.query.city;
    const apiKey = 'YOUR_API_KEY';
    //获取网络接口数据
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=zh_cn`).then(response => {
        return response.json();
    }).then(data => {
        res.json(data);
    }).catch(error => {
        // console.log(error);
    })

    // 返回数据给前端
    // console.log('Received a request')
    // res.json({ message: 'Hello from the server!' });
})
app.get('/api/echarts', (req, res) => {
    // let header = req.headers;
    // // console.log(header);
    let ROOT_PATH = 'https://echarts.apache.org/examples';
    fetch(ROOT_PATH + '/data/asset/data/life-expectancy-table.json').then(response => {
        return response.json();
    }).then(data => {
        res.json(data);
    }).catch(error => {
        // console.log(error);
    })
    // 返回数据给前端
    // console.log('Received a request')
    // res.json({ message: 'Hello from the server!' });
})
app.get('/api/bing_img', (req, res) => {
    fetch('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=zh-CN').then(response => {
        return response.json();
    }).then(data => {
        res.json(data);
    }).catch(error => {
        // console.log(error);
    })
    // 返回数据给前端
    // console.log('Received a request')
    // res.json({ message: 'Hello from the server!' });
})
 
// 其他中间件或路由
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // console.log(`Server is running on port ${PORT}`);
});