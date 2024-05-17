const express = require('express');
const cors = require('cors');
 
const app = express();
 
// 设置CORS头部
app.use(cors({
//   origin: [
//     'https://my-blog-website-4kq9p2og7-xywihis-projects.vercel.app', // 允许来自Vercel域的请求
//     'http://localhost:3000', // 允许来自本地开发环境的请求
//     'https://api.openweathermap.org',
//     'https://echarts.apache.org',
//     'https://cn.bing.com',
//     'https://fanyi-api.baidu.com/' ,

//   ], // 只允许来自Vercel的请求
  origin: '*', // 只允许来自Vercel的请求
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // 允许cookies等认证信息
}));
//获取请求头
app.use(function (req, res, next) {
    // console.log(req.headers);
    next();
})
// 处理前端请求
app.get('/api/weather', (req, res) => {
    // 获取请求参数
    const lat = req.query.lat;
    const lon = req.query.lon;
    const appid = req.query.appid;
    //获取网络接口数据
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&lang=zh_cn`).then(response => {
        return response.json();
    }).then(data => {
        res.json(data);
    }).catch(error => {
        console.log(error);
    })

    // 返回数据给前端
    console.log('Received a request')
    // res.json({ message: 'Hello from the server!' });
})

app.get('/api/echarts', (req, res) => {
    // let header = req.headers;
    // console.log(header);
    let ROOT_PATH = 'https://echarts.apache.org/examples';
    fetch(ROOT_PATH + '/data/asset/data/life-expectancy-table.json').then(response => {
        return response.json();
    }).then(data => {
        res.json(data);
    }).catch(error => {
        console.log(error);
    })
    // 返回数据给前端
    console.log('Received a request')
    // res.json({ message: 'Hello from the server!' });
})
app.get('/api/bing_img', (req, res) => {
    fetch('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=zh-CN').then(response => {
        return response.json();
    }).then(data => {
        res.json(data);
    }).catch(error => {
        console.log(error);
    })
    // 返回数据给前端
    console.log('Received a request')
    // res.json({ message: 'Hello from the server!' });
})

app.post('/api/translate', (req, res) => {
    // 获取请求参数
    const {q,from,to,appid,sign} = req.query;
    //获取网络接口数据
    fetch(`https://fanyi-api.baidu.com/api/trans/vip/translate?q=${q}&from=${from}&to=${to}&appid=${appid}&sign=${sign}`).then(response => {
        return response.json();
    }).then(data => {
        console.log('-----------',data);
        res.json(data);
    }).catch(error => {
        console.log(error);
    })

    // 返回数据给前端
    console.log('Received a request')
    // res.json({ message: 'Hello from the server!' });
})
 
// 其他中间件或路由
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});