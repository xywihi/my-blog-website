import {uploadImg} from "@/http/require";

export default class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this.uploadFile(file, resolve);
        })
    );
  }

  uploadFile(file, resolve) {
    // 上传文件
    
    var data = new FormData();
    data.append("image", file);
    // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=zh_cn`;
    uploadImg(data).then((res) => {
      resolve({
        default: "http://localhost:3000" + res.fileUrl,
      });
    });
    // $.ajax({
    //   url: "http://localhost:3000/api/upload",
    //   type: "POST",
    //   data: file,
    //   processData: false,
    //   beforeSend: function (request) {
    //     request.setRequestHeader("Content-Type", file.type);
    //   },
    //   success: function (respJson) {
    //     if (respJson.code == 0) {
    //       resolve({
    //         default: respJson.result[0].url,
    //       });
    //     } else {
    //       alert("错误：" + respJson.msg);
    //     }
    //   },
    //   error: function (e) {},
    // });
  }

  // Aborts the upload process.
  abort() {
    // Reject the promise returned from the upload() method.
    server.abortUpload();
  }
}
