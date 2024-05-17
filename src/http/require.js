// 定义一个回调函数来处理 XMLHttpRequest 的状态变化

class HttpRequire {
  constructor(prop) {
    this.type = prop;
    this.xhr = new XMLHttpRequest();
  }
  get(url, params = {}) {
    const queryString = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");

    const requestURL = `${url}?${queryString}`;
    return fetch(requestURL,params).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
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
  post(url, params) {
    const formData = new URLSearchParams();
    for (const key in params) {
      formData.append(key, params[key]);
    }

    const requestBody = formData.toString();
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody,
    }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // 或者 response.text()，取决于响应的内容类型
    })
    ;
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

export default HttpRequire;
