import React, { useEffect } from "react";
import OpenAI from "openai";
import styles from "./index.module.less";

export default function SearchServerBox() {
  const openai = new OpenAI({baseURL : "https://api.fe8.cn/v1",apiKey:"sk-dCslKhodCvB8wVJAdIrAV9lHze8QhbfJmFLBWlwFGMVHDi8I",dangerouslyAllowBrowser:true});
  

  useEffect(() => {}, []);
  const  handleOpenAI = async () => {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });
  
    console.log('openai:',completion.choices[0]);
  }
  return (
    <>
      <div className={styles.searchSeaverBox}>
        <button onClick={handleOpenAI}>openAI</button>
        {/* <div className="font14 fontB maB12">
          <input
            className="font18 fontB"
            type="text"
            placeholder="请输入搜索内容..."
          />
        </div>
        <hr /> */}
        {/* <object
          data="https://chat.baidu.com/"
          width="200"
          height="400"
          type="text/html"
        ></object> */}
        {/* <embed style={{overflow:"hidden"}} type="video/webm" src="https://chat.openai.com/" width="100%" height="100%"></embed> */}
      </div>
    </>
  );
}
