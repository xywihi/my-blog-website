let xhr = new XMLHttpRequest();
// 定义一个回调函数来处理 XMLHttpRequest 的状态变化

 class HttpRequire {
    get(url,params){
        return new Promise((resolve,reject)=>{
            xhr.open("get",url,true);
            // xhr.setRequestHeader('content-type', 'application/json');
            // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            // xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xhr.send(JSON.stringify(params))
            
            xhr.onload = function() {
                // console.log(JSON.parse(xhr.response));
                resolve(JSON.parse(xhr.response))
            }
        })
        
    }
    getImg(url,params){
      return new Promise((resolve,reject)=>{
        
        xhr.open("get",url,true);
        xhr.send(JSON.stringify(params))
        xhr.onload = function() {
          
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