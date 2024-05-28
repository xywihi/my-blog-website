import React from "react";

const Clocker = React.lazy(() => import("./components/Clocker"));
const CalculatorBox = React.lazy(() => import("./components/CalculatorBox"));
const CalendarBox = React.lazy(() => import("./components/CalendarBox"));
const PhotosBox = React.lazy(() => import("./components/PhotosBox"));
const VideoBox = React.lazy(() => import("./components/VideoBox"));
const TimerBox = React.lazy(() => import("./components/TimerBox"));
const OpenAiBox = React.lazy(() => import("./components/OpenAiBox"));
const Banner = React.lazy(() => import("./components/Banner"));
const PersonalAvatar = React.lazy(() => import("./components/PersonalAvatar"));
const NewsBox = React.lazy(() => import("./components/NewsBox"));
const FansMessagesBox = React.lazy(() => import("./components/FansMessagesBox"));
const ExamCountdown = React.lazy(() => import("./components/examCountdown"));
const TimeWeather = React.lazy(() => import("./components/timeWeather"));
const MusicPlayer = React.lazy(() => import("../../components/musicPlayer"));
const TranslateBox = React.lazy(() => import("./components/TranslateBox"));
// const SmoothedLine = React.lazy(() => import("../../components/echarts/smoothedLine"));
const FarmBox = React.lazy(() => import("./components/FarmBox"));

const TurntableBox = React.lazy(() => import("./components/game/TurntableBox"));
const MemorandumBox = React.lazy(() => import("./components/MemorandumBox"));













const windowW = window.innerWidth - 46;
const areaHNum = windowW > 1400 ? 20 : windowW > 640 ? 10 : 1;
const areaVNum = windowW > 1400 ? 20 : windowW > 640 ? 40 : 1;

export const cardsData = [
    {
      name: "banner",
      label: "轮播图",
      icon: "ios-timer",
      component: Banner,
      props: {
        wNum: 6,
        hNum: 4,
        unitWidth: windowW / areaHNum,
      },
    },
    {
      name: "examCountdown",
      label: "考试倒计时",
      icon: "ios-timer",
      component: ExamCountdown,
      props: {
        wNum: 3,
        hNum: 4,
        minWNum: 3,
        minHNum: 3,
        unitWidth: windowW / areaHNum,
      },
    },
    {
      name: "timeWeather",
      label: "时间天气",
      icon: "ios-time",
      component: TimeWeather,
      props: {
        wNum: 2,
        hNum: 1,
        paddingD: {h:24,v:12},
        cardSize: "small",
        unitWidth: windowW / areaHNum,
      },
    },
    {
      name: "musicPlayer",
      label: "音乐播放器",
      icon: "ios-musical-notes",
      component: MusicPlayer,
      props: {
        wNum: 3,
        hNum: 4,
        padding: 24,
      },
    },
    {
      name: "translateBox",
      label: "翻译",
      icon: "ios-globe",
      component: TranslateBox,
      props: {
        wNum: 5,
        hNum: 3,
        padding: 24,
        minHNum: 3,
        minWNum: 5,
      },
    },
    // {
    //   name: "smoothedLine",
    //   label: "折线图",
    //   icon: "ios-pie",
    //   component: SmoothedLine,
    //   props: {
    //     wNum: 4,
    //     hNum: 3,
    //     height:windowW/areaHNum *4,
    //     width:windowW/areaHNum*3,
    //   },
    // },
    {
      name: "personalAvatar",
      label: "个人头像",
      icon: "ios-person",
      component: PersonalAvatar,
      props: {
        wNum: 1,
        hNum: 1,
        padding: 6,
        unitWidth: windowW / areaHNum,
      },
    },
    {
      name: "newsBox",
      label: "新闻",
      icon: "ios-paper",
      component: NewsBox,
      props: {
        wNum: 4,
        hNum: 2,
        padding: 24,
        unitWidth: windowW / areaHNum,
      },
    },
    {
      name: "fansMessagesBox",
      label: "粉丝消息",
      icon: "ios-chatbubbles",
      component: FansMessagesBox,
      props: {
        wNum: 4,
        hNum: 3,
        padding: 24,
        unitWidth: windowW / areaHNum,
      },
    },
    {
      name: "memorandumBox",
      label: "备忘录",
      icon: "ios-bookmarks",
      component: MemorandumBox,
      props: {
        wNum: 3,
        hNum: 4,
        padding: 24,
        unitWidth: windowW / areaHNum,
      },
    },
    {
      name: "clocker",
      label: "时钟",
      icon: "ios-clock",
      component: Clocker,
      props: {
        wNum: 2,
        hNum: 2,
        unitWidth: windowW / areaHNum,
      },
    },
    {
      name: "calculatorBox",
      label: "计算器",
      icon: "ios-calculator",
      component: CalculatorBox,
      props: {
        wNum: 3,
        hNum: 4,
        padding:24,
        unitWidth: windowW / areaHNum,
      },
    },
    
    // {
    //   name: "photosBox",
    //   label: "照片",
    //   icon: "ios-image",
    //   component: PhotosBox,
    //   props: {
    //     wNum: 4,
    //     hNum: 2,
    //     unitWidth: windowW / areaHNum,
    //   },
    // },
    // {
    //   name: "videoBox",
    //   label: "视频",
    //   icon: "ios-videocam",
    //   component: VideoBox,
    //   props: {
    //     wNum: 4,
    //     hNum: 3,
    //     unitWidth: windowW / areaHNum,
    //   },
    // },
    {
      name: "timerBox",
      label: "计时器",
      icon: "ios-alarm",
      component: TimerBox,
      draggable: true,
      props: {
        wNum: 2,
        hNum: 1,
        padding:24,
        draggable: true,
        unitWidth: windowW / areaHNum,
      },
    },
    {
      name: "openAiBox",
      label: "AI",
      icon: "ios-chatbubbles",
      component: OpenAiBox,
      props: {
        wNum: 4,
        hNum: 5,
        padding:24,
        unitWidth: windowW / areaHNum,
        change:{
          v:true,
          h:false
        }
      },
    },
    {
      name: "calendarBox",
      label: "日历",
      icon: "ios-calendar",
      component: CalendarBox,
      props: {
        name: "calendarBox",
        wNum: 4,
        hNum: 4,
        padding:24,
        cardSize:'large',
      },
    },
    {
      name: "farmBox2",
      label: "农场",
      icon: "ios-calendar",
      component: FarmBox,
      props: {
        name: "farmBox",
        wNum: 4,
        hNum: 2,
        cardSize:'large',
      },
    },
    {
      name: "turntable",
      label: "转盘",
      icon: "ios-calendar",
      component: TurntableBox,
      props: {
        name: "turntable",
        wNum: 2,
        hNum: 2,
        kinds:[
          {
            icon:'fat',
            name:'你胖了',
            color:'bg_red'
          },
          {
            icon:'add',
            name:'中午加餐',
            color:'bg_purple'
          },
          {
            icon:'fang',
            name:'方便面来一桶',
            color:'bg_orange'
          },
          {
            icon:'movie',
            name:'周末看电影',
            color:'bg_blue'
          },
        ]
      },
    },
    
  ];