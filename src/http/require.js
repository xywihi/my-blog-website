import CryptoJS from "crypto-js";
// 定义一个回调函数来处理 XMLHttpRequest 的状态变化
const API_URL = "http://anlnblog.free.idcfengye.com/";
// const API_URL = "http://4008451utsx9.vicp.fun:30737/";

// 读取cookie中的token
// function getTokenFromCookie() {
//   const name = "token=";
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const ca = decodedCookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }
export class HttpRequire {
  constructor(prop) {
    this.type = prop;
    this.xhr = new XMLHttpRequest();
  }
  async get(url, params = {},header={}) {
    const queryString = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");

    const requestURL = `${API_URL + url}?${queryString}`;
    return fetch(requestURL, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Cookie":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTY2MzUyMDQsInVzZXJfZW1haWwiOiJhbmxuQGdtYWlsLmNvbSJ9.qGvLPJBLrmkahTeez5sSlATLUe_yv4Qim1OmImc8bGs",
        ...header,
        // "Authorization": "Bearer " + getTokenFromCookie(),
      }
    }).then((response) => {
      // if (!response.ok) {
      //   throw new Error("似乎没有启动服务，请检查");
      // }
      return response.json().then((data) => {
        if (data.code == 401) {
          // 路由重定向
          window.location.href = "/#/login";
        }
        return data;
      });
    }).catch((error) => {
      // 获取状态码
      // 重定向到login
      window.location.href = "/#/login";
      // console.log("Error:", error);
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
  async post(apiUrl, params, header) {
    const requestBody = JSON.stringify(params);

    return fetch(API_URL + apiUrl, {
      method: "post",
      credentials: "include",
      headers: { ...header },
      body: requestBody,
    })
      .then((response) => {
        return response.json(); // 或者 response.text()，取决于响应的内容类型
      })
      .catch(() => {
        // console.error("Error:", error);
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
  const hashedPassword = CryptoJS.SHA256(password).toString();
  // console.log("Salt:", salt);
  console.log("Hashed Password:", hashedPassword);
  return http.post(
    "login",
    { ...params, password: hashedPassword },
    { "Content-Type": "application/json" }
  );
};
export const logOut = async () => {
  // 示例用法（需要处理Promise）
  return http.get(
    "logout",
  ).then((res) => {
    if (res?.code == 200) {
      window.location.href = "/#/login";
    }
  }).catch((err) => {
    console.log(err)
  });
};
export const register = async (params) => {
  // 示例用法（需要处理Promise）
  const password = params.password;
  // const salt = await generateSalt();
  const hashedPassword = CryptoJS.SHA256(password).toString();
  // console.log("Salt:", salt);
  console.log("register Hashed Password:", hashedPassword);
  return http.post(
    "register",
    { ...params, password: hashedPassword },
    { "Content-Type": "application/json" }
  );
};
export const uploadImg = (params) => http.post("upload", params);
export const createArticle = (params) => http.post("create_article", params);
export const getArticles = (params) => http.get("get_article", params);
export const getArticle = (params) => http.get("get_article", params);
export const updateArticle = (params) => http.post("update_article", params);
export const deleteNewsItem = (params) => http.post("delete_article", params);
export const searchArticles = (params) => http.get("search_articles", params);
export const searchUsers = (params) => http.get("search_users", params);
