let xhr = new XMLHttpRequest();
// 定义一个回调函数来处理 XMLHttpRequest 的状态变化

 class HttpRequire {
    get(url,params){
        return new Promise((resolve,reject)=>{
            // xhr.onreadystatechange = function () {
            //     // 当请求完成并且状态码为 200 时
            //     if (xhr.readyState === 4 && xhr.status === 200) {
            //       // 处理响应数据
            //       var responseData = xhr.responseText;
            //       console.log(xhr.status,'初始响应数据:', responseData);
            //     }
                
            //     // 当请求完成并且状态码为 3xx（重定向）时
            //     if (xhr.readyState === 4 && xhr.status >= 300 && xhr.status < 400) {
            //       // 获取重定向后的 URL
            //       var redirectedUrl = xhr.getResponseHeader('Location');
            //       console.log('重定向后的 URL:', redirectedUrl);
              
            //       // 发起新的 XMLHttpRequest 请求到重定向后的 URL
            //       var newXHR = new XMLHttpRequest();
            //       newXHR.open('GET', redirectedUrl, true);
            //       newXHR.onreadystatechange = function () {
            //         if (newXHR.readyState === 4 && newXHR.status === 200) {
            //           // 处理新响应数据
            //           var newResponseData = newXHR.responseText;
            //           console.log('新响应数据:', newResponseData);
            //         }
            //       };
            //       newXHR.send();
            //     }
            //   };
            xhr.open("get",url,false);
            // xhr.setRequestHeader('content-type', 'application/json');
            // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            // xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xhr.send(JSON.stringify(params))
            
            xhr.onload = function() {
                // console.log(JSON.parse(xhr.response));
                console.log(xhr.response)
                resolve(xhr.response)
            }
        })
        
    }
    getImg(url,params){
      return new Promise((resolve,reject)=>{
        
        xhr.open("get",url,true);
        xhr.send(JSON.stringify(params))
        xhr.onload = function() {
          console.log(xhr.response.blob());
          
          // var imageUrl = URL.createObjectURL(xhr.response);
          // console.log("imageUrl",imageUrl)
            
            resolve({})
          // xhr.response.blob().then(blobData => {
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
            xhr.open('post', url, true);
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xhr
            // xhr.onreadystatechange = function() {
            //     if (xhr.readyState === 4 && xhr.status === 200) {
            //       var response = JSON.parse(xhr.responseText);
            //       console.log(response);
            //     }
            //   };
            xhr.send(JSON.stringify(params));
            xhr.onload = function() {
                // console.log(JSON.parse(xhr.response));
                resolve(JSON.parse(xhr.response))
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
    //             console.log(data)
    //           // 请求成功后的处理逻辑
    //         },
    //         error: function() {
    //           // 请求失败后的处理逻辑
    //         }
    //       });
    // }
}

export default HttpRequire