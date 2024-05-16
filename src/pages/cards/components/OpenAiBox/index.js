import React, { useEffect, useState, useRef } from "react";
import OpenAI from "openai";
import styles from "./index.module.less";
import { IonIcon } from "@ionic/react";
import { Loader } from "@/components/animaIcons";
import robot from "@/assets/images/robot.svg";
import { speak } from "@/util";
export default function OpenAiBox() {
  const textareaRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState("");

  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    textareaRef.current.addEventListener("input", function () {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 1 + "px";
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && event.ctrlKey && event.target.value) {
        let question = event.target.value.trim();
        if (question != "") {
          handleOpenAI(question);
          // speak('我是Anln，现在你是我的私人小助理爱丽,每天早上9:00和晚上18:00需要向我打招呼和报时和解决我的问题。',7)
        }
      }
    });
  }, []);
  const handleOpenAI = async (question) => {
    setLoading(true);
    try {
      const openai = new OpenAI({
        baseURL: "https://api.fe8.cn/v1",
        // apiKey: "sk-dCslKhodCvB8wVJAdIrAV9lHze8QhbfJmFLBWlwFGMVHDi8I",
        dangerouslyAllowBrowser: true,
      });
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: question }],
        model: "gpt-3.5-turbo",
      });
      setLoading(false);
      let answers = completion.choices[0].message.content;
      setAiAnswer((old) => {
        // 文字转语音
        speak(answers, 7);
        return answers;
      });
    } catch (error) {
      let timer = setTimeout(() => {
        setLoading(false);
        setAiAnswer((old) => {
          // 文字转语音
          speak(
            "Hello，现在我是你的的私人小助理大山,随时解决你的问题。",
            7
          );

          return "Hello，现在我是你的的私人小助理大山,随时解决你的问题。";
        });
        clearTimeout(timer);
      },1500);
    }
  };
  // 我是Anln，现在你是我的私人小助理爱丽,每天早上9:00和晚上18:00需要向我打招呼和报时和解决我的问题。
  return (
    <>
      <div className={styles.searchSeaverBox}>
        <div className={`${styles.inputBox} maB12`}>
          <div className="">
            <textarea
              ref={textareaRef}
              className="font14 fontB borderR12 border20 paV6 paH12 border_black widthFull scrollbarBox scrollbarBox_hidden"
              type="text"
              placeholder="请输入搜索内容..."
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
          </div>
          <div
            className={`textCenter font46 ${styles.robotBox}`}
            onClick={() => aiAnswer != "" && speak(aiAnswer,7)}
          >
            {loading ? (
              <Loader />
            ) : (
              <IonIcon icon={robot} size="18px"></IonIcon>
            )}
          </div>
          <p className={`${styles.aiAnswerBox} heightFull scrollbarBox`}>
            {aiAnswer}
          </p>
          {/* <div className="cursor icon_hover icon maT3 textCenter" onClick={handleOpenAI}>
            <IonIcon icon={chatboxEllipses} size="36px"></IonIcon>
          </div> */}
        </div>
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
