let xhr = new XMLHttpRequest();
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