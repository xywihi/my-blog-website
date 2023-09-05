import React,{useEffect, useState} from "react";
import './styles.less'
import {IonIcon} from "@ionic/react"
import { menu, play, pause,bookOutline } from 'ionicons/icons';
import AudioPlayer from "../../components/audioPlayer"
import SmoothedLine from "../../components/echarts/smoothedLine"
import musc from "../../assets/audio/shine.mp3"
import news from "../../assets/audio/new.mp3"
import starts from "../../assets/audio/starts.mp3"
import unknown from "../../assets/audio/unknown.mp3"
const audios = [{name:"Shine",resource:musc},{name:"New Normal",resource:news},{name:"we'll be the starts",resource:starts}]
export default function Home(props){
    const [currentDate,setCurrentDate] = useState(new Date())
    const [currentAudio,setCurrentAudio] = useState(null)
    useEffect(() => {
        // throwError()
        console.log('-----------',currentDate.getMinutes().toString().length)
        setCurrentAudio(audios[0])
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
                    <div className="waterfall-item borderR12 item1 bg1 pa24 cardBox" >
                        <h3 className="title maB12">
                            最近状态
                        </h3>
                    </div>
                    <div className="waterfall-item borderR12 item2" >
                        <div className="waterfall-item borderR12 item2_inner1 bg1 pa24 cardBox" >
                            <div className="maB12">
                                {currentAudio && <AudioPlayer resource={currentAudio.resource}/>}
                            </div>
                            <ul>
                                {audios.map(item=><li key={item.name} className="paV12 flexB" onClick={()=>changeAudio(item)}><span>{item.name}</span><IonIcon icon={ (currentAudio && currentAudio.name===item.name) ? pause : play} size="36px"></IonIcon></li>)}
                            </ul>
                        </div>
                        <div className="waterfall-item borderR12 item2_inner2 bg1 pa24 cardBox" >
                            <div className="item2_inner2_inner1 maB24 flexB column">
                                <div className="fontB">{Math.ceil((new Date("2023/10/28")-new Date())/(1000*60*60*24))}</div>
                                <span className="fontSmall gray">2023/10/28-2023/10/29</span>
                            </div>
                            <div className="item2_inner2_inner2 flexB column">
                                <IonIcon className="maB12" icon={bookOutline} size="36px"></IonIcon>
                                <div>自考倒计时</div>
                            </div>
                        </div>
                        <div className="waterfall-item borderR12 item2_inner3" >
                            <div className="waterfall-item borderR12 item2_inner3_inner1 bg1 pa24 flexS cardBox" >
                                <img alt="Silhouette of a person's head" src="https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7" />
                                <label className="maH12">
                                    <h4 className="fontB">Anln</h4>
                                    <span className="fontSmall">疯狂努力拼搏中...</span>
                                </label>
                            </div>
                            <div className="waterfall-item borderR12 item2_inner3_inner2 bg1 paH24 paV12 cardBox" >
                                <div className="item2_inner3_inner2_inner1 flexS">{(currentDate.getHours().toString().length>1 ? '':'0')+currentDate.getHours()}<span className="flicker">:</span>{(currentDate.getMinutes().toString().length>1 ? '':'0')+currentDate.getMinutes()}</div>
                                <div className="item2_inner3_inner2_inner2">{currentDate.getMonth()+1}月</div>
                                <div className="item2_inner3_inner2_inner3 gray">{currentDate.getFullYear()}/{currentDate.getMonth()+1}/{currentDate.getDate()}</div>
                                <div className="item2_inner3_inner2_inner3 gray">晴</div>
                            </div>
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
                                <div className="messageInnerBox bg3 borderR12 pa12 flexFull maB12 widthFull flexBS column">
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
                            数据展示
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
