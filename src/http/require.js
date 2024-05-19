import { generateSalt, createHash } from "./tools";

// 定义一个回调函数来处理 XMLHttpRequest 的状态变化
const API_URL = "http://localhost:3000/api/";
export class HttpRequire {
  constructor(prop) {
    this.type = prop;
    this.xhr = new XMLHttpRequest();
  }
  async get(url, params = {}) {
    const queryString = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");

    const requestURL = `${url}?${queryString}`;
    return fetch(requestURL, params).then((response) => {
      if (!response.ok) {
        throw new Error("似乎没有启动服务，请检查");
      }
      return response.json(); // 或者 response.text()，取决于响应的内容类型
    });
  }
  getImg(url, params) {
    return new Promise((resolve, reject) => {
      let that = this;
      that.xhr.open("get", url, true);
      that.xhr.send(JSON.stringify(params));
      that.xhr.onload = function () {
        // var imageUrl = URL.createObjectURL(that.xhr.response);
        // // console.log("imageUrl",imageUrl)

        resolve({});
        // that.xhr.response.blob().then(blobData => {
        //   // 在这里处理图片二进制数据
        //   // 例如，你可以创建一个 URL 对象来显示图像

        //   var imageUrl = URL.createObjectURL(blobData);

        //   resolve(imageUrl)
        // })
      };
    });
  }
  async post(apiUrl, params,header) {
    const requestBody = JSON.stringify(params);
    return fetch(apiUrl, {
      method: "POST",
      headers:header,
      body: requestBody,
    }).then((response) => {
      return response.json(); // 或者 response.text()，取决于响应的内容类型
    }).catch((error) => {
      console.error("Error:", error);
    });
  }

  // post(url,params){
  //     $.ajax({
  //         url,
  //         type: "POST",
  //         dataType: "json",
  //         data: params,
  //         success: function(data) {
  //             // console.log(data)
  //           // 请求成功后的处理逻辑
  //         },
  //         error: function() {
  //           // 请求失败后的处理逻辑
  //         }
  //       });
  // }
}
const http = new HttpRequire();
export const login = async (params) => {
  // 示例用法（需要处理Promise）
  const password = params.password;
  // const salt = await generateSalt();
  const hashedPassword = await createHash(password);
  // console.log("Salt:", salt);
  console.log("Hashed Password:", hashedPassword);
  return http.post(API_URL + "login", {...params, password: hashedPassword},{"Content-Type": "application/json"})
};
export const register = async (params) => {
  // 示例用法（需要处理Promise）
  const password = params.password;
  // const salt = await generateSalt();
  const hashedPassword = await createHash(password);
  // console.log("Salt:", salt);
  console.log("register Hashed Password:", hashedPassword);
  return http.post(API_URL + "register", {...params, password: hashedPassword},{"Content-Type": "application/json"})
};
export const uploadImg = (params) => http.post(API_URL + "upload", params);
