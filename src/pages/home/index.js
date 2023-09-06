import React,{useEffect, useState} from "react";
import './styles.less'
import {IonIcon} from "@ionic/react"
import { menu, play, pause,bookOutline, colorWand } from 'ionicons/icons';
import AudioPlayer from "../../components/audioPlayer"
import SmoothedLine from "../../components/echarts/smoothedLine"

import ExamCountdown from "./components/examCountdown"
import TimeWeather from "./components/timeWeather"
import MusicPlayer from "./components/musicPlayer"
export default function Home(props){
    const [currentDate,setCurrentDate] = useState(new Date())
    const [currentAudio,setCurrentAudio] = useState(null)
    useEffect(() => {
        // throwError()
        console.log('-----------',currentDate.getMinutes().toString().length)
        let timer = setInterval(()=>{
            setCurrentDate(new Date())
        },10000)
        return ()=>{
            clearTimeout(timer)
        }
    }, [])
    // const throwError = () => {
    //     console.log('--------------------', 1/0)
    //     return 1/0
    //     // throw new Error('This is a simulated error.');
    // };
    const changeAudio = (item)=>{
        console.log('/////////',item)
        setCurrentAudio(item)
    }
    return (
        <div className="bg2_blue">
            <div id="waterfall-container">
                    <div className="waterfall-item borderR12 item1 bg1 cardBox" >
                        <img className="borderR12" src="https://images.unsplash.com/photo-1528834342297-fdefb9a5a92b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"/>
                    </div>
                    <div className="waterfall-item borderR12 item2" >
                        <div className="waterfall-item borderR12 item2_inner1 bg1 pa24 cardBox" >
                            <MusicPlayer/>
                        </div>
                        <div className="waterfall-item borderR12 item2_inner2 bg1 pa24 cardBox" >
                            <ExamCountdown/>
                            
                        </div>
                        <div className="waterfall-item borderR12 item2_inner3" >
                            <div className="waterfall-item borderR12 item2_inner3_inner1 bg1 pa24 flexS cardBox" >
                                <img alt="Silhouette of a person's head" src="https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7" />
                                <label className="maH12">
                                    <h4 className="fontB">Anln</h4>
                                    <span className="fontSmall">疯狂努力拼搏中...</span>
                                </label>
                            </div>
                            <TimeWeather/>
                        </div>
                    </div>
                    <div className="newsBox waterfall-item borderR12 item3" >
                        <div className="waterfall-item borderR12 item3_inner1 bg1 pa24 cardBox" >
                            <h3 className="title maB12 flexB">
                                <span>最新动态</span> <IonIcon className="maR12" icon={menu} size="36px"></IonIcon>
                            </h3>
                            <ul>
                                <li className="newsItemBox flexB maB6 pa6">
                                    <span className="textSingeLine maR12 font14">人间有神兽，来自九重天</span>
                                    <span className="fontSmall gray">2023/09/05</span>
                                </li>
                                <li className="newsItemBox flexB maB6 pa6 font14">
                                    <span className="textSingeLine maR12">一部关于电影浪漫的作品，欢迎光临梦想与拼搏的世界！ </span>
                                    <span className="fontSmall gray">2023/09/05</span>
                                </li>
                                <li className="newsItemBox flexB maB6 pa6 font14">
                                    <span className="textSingeLine maR12">主题曲是花谱唱的，很好听</span>
                                    <span className="fontSmall gray">2023/09/05</span>
                                </li>
                                <li className="newsItemBox flexB maB6 pa6 font14">
                                    <span className="textSingeLine maR12">探索属于你的新世界</span>
                                    <span className="fontSmall gray">2023/09/05</span>
                                </li>
                            </ul>
                        </div>
                        <div className="waterfall-item borderR12 item3_inner2 bg1 pa24 cardBox messagesBox flexSS column " >
                            <h3 className="title maB12 flexB widthFull">
                                <span>粉丝留言</span> <IonIcon className="maR12" icon={menu} size="36px"></IonIcon>
                            </h3>
                            <div className="content flexB column flexFull widthFull">
                                <div className="messageInnerBox bg3 borderR6 pa12 flexFull maB12 widthFull flexBS column">
                                    <div className="font14">6月生日冠名争夺战结束,恭喜粉丝为@时代少年团-贺峻霖解锁惊喜福利</div>
                                    <div className="flexB gray widthFull fontSmall"><span>8/23</span><span>四川</span></div>
                                </div>
                                <ul className="flexS">
                                    <li className="maR12 activeAvatar"><img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7"/></li>
                                    <li className="maR12"><img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.ofjm5a8hxRo_o7HYH3MxQgHaHX?w=202&h=200&c=7&r=0&o=5&pid=1.7"/></li>
                                    <li className="maR12"><img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.7GGt63j6XvfNNA9iFsjDXgHaFj?w=234&h=180&c=7&r=0&o=5&pid=1.7"/></li>
                                    <li className="maR12"><img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.dN6NLMe9_qgenDX1VRyOOQAAAA?w=158&h=180&c=7&r=0&o=5&pid=1.7"/></li>
                                    <li className="maR12"><img src="https://tse2-mm.cn.bing.net/th/id/OIP-C.yUorDiY6WO0l_0p-5aNtqQHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7"/></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="waterfall-item borderR12 item4 bg1 pa24 cardBox" >
                        <h3 className="title maB12">
                            最新数据走势
                        </h3>
                        <SmoothedLine/>
                    </div>
                    <div className="waterfall-item borderR12 item5 bg1 pa24 cardBox" >
                        <h3 className="title maB12">
                            数据展示
                        </h3>
                    </div>
                </div>
        </div>
    )
}
