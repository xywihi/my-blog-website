import React, { useEffect, useState, useRef } from "react";
import OpenAI from "openai";
import styles from "./index.module.less";
import { IonIcon } from "@ionic/react";
import { Loader } from "@/components/animaIcons";
import robot from "@/assets/images/robot.svg";
import { speak, handleCopyText,getTimeText2 } from "@/util";
import { showStatusBox } from "@/store/actions";
import { connect } from "react-redux";
import { copy, megaphone } from "ionicons/icons";
const timeType =
  new Date().getHours() < 12
    ? "早上好"
    : new Date().getHours() > 18
    ? "晚上好"
    : "下午好";
const defaultRobotAnswers = [
  "我是你的小助手-大山，随时解决你的问题。",
  "今天你有开心吗？",
  "今天天气怎么样呢？有出去玩吗？",
  timeType + ",您今天看起来很精神，请问有什么我可以为你安排或者提醒的？",
  "嗨，我在这儿，随时为你效劳。",
  "你好，有什么我可以帮你的吗？",
  "欢迎回来，有什么新任务要交给我吗？",
  "嗨，今天感觉怎么样？有什么需要我帮忙的吗？",
  "嘿，我是你的语音助手，随时准备为你服务。",
  "你好呀，有什么需要我协助完成的事情吗？",
  timeType + "，今天有什么计划需要我帮忙安排吗？",
  timeType + "，有什么我可以帮你做的？",
  "你好，请告诉我你的需求，我会尽力帮助你。",
  "嗨，我是你的语音助手，请问有什么我可以做的？",
  "欢迎使用我的服务，请问有什么需要我帮忙的？",
  "你好，我是你的贴心小助手，随时准备帮助你。",
  "嘿，有什么我可以为你做的吗？请随时告诉我。",
  "你好，我是你的语音助手，请问有什么我可以协助的？",
  "欢迎回来，有什么新动态或者新需求要告诉我吗？",
  "嗨，我是你的小帮手，请告诉我你需要什么。",
  "你好，请问有什么我可以帮忙解答的问题吗？",
  "嘿，我是你的语音助手，请告诉我你的需求。",
];

function OpenAiBox({ weatherInfo, showStatusBox, plans }) {
  const answerListRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState({
    noQuestions: { status: true, value: [] },
    answers: { status: false, value: [] },
    loading: { status: false, value: "正在思考中..." },
    nopay: {
      status: false,
      value: "噢，你好像忘记给我充电了，我需要充电才能使用。",
    },
  });
  const [robotAnswers, setRobotAnswers] = useState(defaultRobotAnswers);

  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
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

  useEffect(() => {
    let lastIndex = aiAnswer.answers.value.length - 1;
    wordByWordOutput(
      aiAnswer.answers.value[lastIndex],
      0,
      "output" + lastIndex
    );
  }, [aiAnswer.answers.value]);

  useEffect(() => {
    console.log("weatherInfo", weatherInfo);
    if (weatherInfo?.Name) {
      let answer = `今天${weatherInfo.Name}的气温是${Math.floor(
        weatherInfo.Main.temp - 273.15
      )}摄氏度，${weatherInfo.Weather[0].description}，天气${
        weatherInfo.Main.temp > 27 + 273.15 ? "炎热" : "凉爽"
      }，${
        weatherInfo.Main.temp > 30 + 273.15
          ? "可以在家学习打发时光。"
          : "你有什么出行计划吗？"
      }`;
      setRobotAnswers((old) => {
        if (aiAnswer.noQuestions.status) {
          handleSpeak();
        }
        return [...robotAnswers, answer];
      });
    }
  }, [weatherInfo]);
  const handleOpenAI = async (question) => {
    setLoading(true);
    setAiAnswer((old) => {
      // 文字转语音
      speak(old.loading.value, 7);
      return {
        ...old,
        loading: { status: true, value: "正在思考中..." },
        answers: { status: false, value: [...old.answers.value,old.loading.value]},
      };
    });
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
      let answer = completion.choices[0].message.content;
      setAiAnswer((old) => {
        // 文字转语音
        speak(answer, 7);
        return {
          ...old,
          loading: { status: false, value: "正在思考中..." },
          answers: {
            status: true,
            value:[...old.answers.value].slice(0,old.answers.value.length-1).concat(['',answer]),
          },
        };
      });
    } catch (error) {
      let timer = setTimeout(() => {
        setLoading(false);
        setAiAnswer((old) => {
          // 文字转语音
          speak(old.nopay.value, 7);
          let newAnswers = [...old.answers.value]
          newAnswers.pop() 
          console.log('............',[...newAnswers,old.nopay.value])
          return {
            ...old,
            loading: { status: false, value: "正在思考中..." },
            answers: { status: false, value:[...newAnswers,old.nopay.value] },
            nopay: { ...old.nopay, status: true },
          };
        });
        clearTimeout(timer);
      }, 1500);
    }
  };
  // 我是Anln，现在你是我的私人小助理爱丽,每天早上9:00和晚上18:00需要向我打招呼和报时和解决我的问题。

  const handleSpeak = (content) => {
    if (aiAnswer.noQuestions.status && !content) {
      setAiAnswer((old) => {
        const getDiffRadadomNum = (min, max) => {
          let radomNum = Math.floor(Math.random() * (max - min));
          return radomNum;
        };
        let newAnswerNum = getDiffRadadomNum(0, robotAnswers.length);
        let newAnswerNum2;
        if (old.answers.value.length > 0) {
          newAnswerNum2 =
            old.value == robotAnswers[newAnswerNum]
              ? getDiffRadadomNum(0, 4)
              : newAnswerNum;
        }
        let firstAnswer = robotAnswers[newAnswerNum2] || robotAnswers[newAnswerNum] || robotAnswers[0];
        speak(firstAnswer, 7);
        return {
          ...old,
          answers: {
            ...old.answers,
            value: old.answers.value.concat([firstAnswer]),
          },
        };
      });
    } else if (aiAnswer.answers.status) {
      speak(aiAnswer.answers.value[aiAnswer.answers.value.length - 1], 7);
    } else if (content) {
      if(content.type === 'repeat') {
        speak(content.value, 7);
        return
      };
      let newAnswer = "";
      switch (content.type) {
        case "weather":
          newAnswer = robotAnswers[robotAnswers.length - 1];
          break;
        case "plans":
          if(!content.value.length){
            newAnswer = "你还没有添加任何计划任务";
            break;
          }
          newAnswer = content.value.reduce((pre, cur, index) => {
            return `${pre}\/\/计划${(index + 1)}：/${cur.name}/${cur.content}/从${getTimeText2(cur.startTime)}，到${getTimeText2(cur.endTime)}结束。/此计划的状态为${cur.status === 0 ? "未完成" : cur.status === 1 ? "过期" : "正在进行"}`;
          },`截至目前你有${content.value.length}条计划任务，其中未完成的有${content.value.filter(item => item.status === 0).length}条，过期的有${content.value.filter(item => item.status === 1).length}条，正在进行的有${content.value.filter(item => item.status === 2).length}条，你的具体计划有如下：`);
          break;

        default:
          break;
      }
      
      setAiAnswer((old) => {
        speak(newAnswer, 7);
        return {
          ...old,
          answers: {
            ...old.answers,
            value: old.answers.value.concat([newAnswer]),
          },
        };
      });
    }
  };

  const wordByWordOutput = (
    text,
    index = 0,
    elementId = "output",
    oldTimer
  ) => {
    let answerListEle = answerListRef.current;
    if (text && index < text.length) {
      const element = document.getElementById(elementId);
      if(element){
        element.innerHTML += text[index]=='/'?'<br/>':text[index]=='&'? '<hr/>':text[index];
        clearTimeout(oldTimer);
        if (answerListEle)
          answerListEle.scrollTop = answerListEle?.scrollHeight + 40;
        let timer = setTimeout(
          () => wordByWordOutput(text, index+1, elementId),
          100,
          timer
        ); // 100毫秒后输出下一个字符
      }
     
    } else {
      // 滚动到底部
    }
  };
  return (
    <>
      <div className={styles.searchSeaverBox}>
        <div className={`${styles.inputBox} maB12`}>
          <div className="heightFull">
            <textarea
              className="font14 fontB borderR12 border20 paV6 paH12 border_black widthFull scrollbarBox scrollbarBox_hidden"
              type="text"
              placeholder="请输入搜索内容..."
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
          </div>
          {}
          {aiAnswer.answers.value.length > 0 && (
            <div className={`${styles.robotBox}  heightFull paT12`}>
              <div className="scrollbarBox" ref={answerListRef}>
              
                <ul>
                  
                  {JSON.parse(JSON.stringify(aiAnswer.answers.value)).map((item, index) => (
                    <li
                      key={index}
                      className={`${styles.aiAnswerBox} paH12 paV6  borderR12 bg3 scrollbarBox maB12`}
                    >
                      <span id={`output` + index} ></span>
                      {!aiAnswer.loading.status && (
                        <p className="flexS">
                          <span
                          className={`cursor icon_hover ${styles.copyBtnBox}`}
                          onClick={() => handleCopyText(item.replace(/\//g, '\n'), showStatusBox)}
                        >
                          <IonIcon icon={copy} size="18px"></IonIcon>
                        </span>
                          <span
                          className={`maL6 cursor icon_hover ${styles.copyBtnBox}`}
                          onClick={() => handleSpeak({type:"repeat",value:item})}
                        >
                          <IonIcon icon={megaphone} size="18px"></IonIcon>
                        </span>
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`${styles.aiRobotBox} maV6 font46`}
                onClick={() => handleSpeak()}
              >
                {loading ? (
                  <Loader
                    styles={{ marginTop: "12px", margiinBottom: "12px" }}
                  />
                ) : (
                  <IonIcon icon={robot} size="18px"></IonIcon>
                )}
              </div>
              <ul className={styles.questionsBox}>
                {weatherInfo?.Name && (
                  <li
                    className="fontSmall borderR12 border paH6"
                    onClick={() => handleSpeak({type:"weather"})}
                  >
                    今天天气如何？
                  </li>
                )}
                {weatherInfo?.Name && (
                  <li
                    className="fontSmall borderR12 border paH6 maT6"
                    onClick={() => handleSpeak({type:"plans",value:plans})}
                  >
                    最近有什么日程安排吗？
                  </li>
                )}
              </ul>
            </div>
          )}

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

const mapStateToProps = (state) => ({
  weatherInfo: state.reducer.weatherInfo,
  plans: state.reducer.plans,
});

const mapDispatchToProps = {
  showStatusBox,
};
export default connect(mapStateToProps, mapDispatchToProps)(OpenAiBox);
