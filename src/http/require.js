
// 定义一个回调函数来处理 XMLHttpRequest 的状态变化

 class HttpRequire {
    constructor(prop) {
        this.type = prop;
        this.xhr= new XMLHttpRequest();
    }
    get(url,params){
        return new Promise((resolve,reject)=>{
            let that = this;
            that.xhr.open("get",url,true);
            // that.xhr.setRequestHeader('content-type', 'application/json');
            // that.xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            // that.xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
            that.xhr.send()
            that.xhr.onload = function() {
                // // console.log(JSON.parse(that.xhr.response));
                resolve(JSON.parse(that.xhr.response))
            }
            
            that.xhr.onerror = function() {
                reject("网络请求失败");
                // console.log("请求失败",that.xhr.statusText)
            }
        })
        
    }
    getImg(url,params){
      return new Promise((resolve,reject)=>{
        let that = this;
        that.xhr.open("get",url,true);
        that.xhr.send(JSON.stringify(params))
        that.xhr.onload = function() {
          
          // var imageUrl = URL.createObjectURL(that.xhr.response);
          // // console.log("imageUrl",imageUrl)
            
            resolve({})
          // that.xhr.response.blob().then(blobData => {
          //   // 在这里处理图片二进制数据
          //   // 例如，你可以创建一个 URL 对象来显示图像
            
          //   var imageUrl = URL.createObjectURL(blobData);
            
          //   resolve(imageUrl)
          // })
      }
        
      })
    }
    post(url,params){
        
        return new Promise((resolve,reject)=>{
            let that = this;
            that.xhr.open('post', url, true);
            // that.xhr.setRequestHeader('content-type', 'application/json');
            // that.xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            // that.xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
            that.xhr
            // that.xhr.onreadystatechange = function() {
            //     if (that.xhr.readyState === 4 && that.xhr.status === 200) {
            //       var response = JSON.parse(that.xhr.responseText);
            //       // console.log(response);
            //     }
            //   };
            that.xhr.send(JSON.stringify(params));
            that.xhr.onload = function() {
                // // console.log(JSON.parse(that.xhr.response));
                resolve(JSON.parse(that.xhr.response))
            }
        })
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

export default HttpRequire