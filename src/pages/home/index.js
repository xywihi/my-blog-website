import React,{useEffect, useState, useRef, createRef} from "react";
import './styles.less'
import {IonIcon} from "@ionic/react"
import { menu, language } from 'ionicons/icons';

import ExamCountdown from "./components/examCountdown"
import TimeWeather from "./components/timeWeather"
import MusicPlayer from "../../components/musicPlayer"
import Translate from "../../components/translate"
import SmoothedLine from "../../components/echarts/smoothedLine"
import {connect} from "react-redux"
import ChatAi from "../../components/chatAi"
import HttpRequire from "../../http/require";
import { showStatusBox } from "@/store/actions";
const Home = ({showStatusBox}) => {
    const [currentDate,setCurrentDate] = useState(new Date())
    const [selectedOption,setSelectedOption] = useState('zh')
    const [wallImage,setWallImage] = useState(null)
    const [currentImageIndex,setCurrentImageIndex] = useState(0)
    const childTranslate = createRef(null)
    useEffect(() => {
        // throwError()
        
        let timer = setInterval(()=>{
            setCurrentDate(new Date())
            setCurrentImageIndex(Math.floor(Math.random()*7))
        },10000)
        const require = new HttpRequire();
        require.get('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=zh-CN').then(res=>{
            setWallImage(res.images);
            wallImage && setCurrentImageIndex(Math.floor(Math.random()*(wallImage.length-1)))
        }).catch(err=>{
            console.log(err)
        })
        return ()=>{
            clearTimeout(timer)
        }
    }, [])
    // const throwError = () => {
    //     console.log('--------------------', 1/0)
    //     return 1/0
    //     // throw new Error('This is a simulated error.');
    // };
    const handleTranslate = ()=>{
        childTranslate.current.handleTranslate()
    }
    console.log('home_page')
    return (
        <div className="bg2_blue">
            <div id="waterfall-container">
                    <div className="waterfall-item borderR12 item1 bg1 cardBox" >
                        {
                            wallImage && 
                            <>
                                <div>
                                    <a target="_blank" hrefLang="en-US" href={wallImage[currentImageIndex].copyrightlink}>
                                        <img src={`https://cn.bing.com${wallImage[currentImageIndex].url}`} alt="wallpaper"/>
                                    </a>
                                </div>
                                <div className="pa24 flexBS column">
                                    <h1 className="font_wenyue fontB">
                                        {/* {banners[0].title.split("，").map(item=> <p key={item}>{item}</p>)}
                                        */}
                                        {wallImage[currentImageIndex].title}
                                    </h1>
                                    <h5>
                                        <p className="maB12">{wallImage[currentImageIndex].copyright}</p>
                                        <p className="gray">{wallImage[currentImageIndex].startdate}</p>
                                    </h5>
                                </div>
                            </>
                        }
                        
                    </div>
                    
                    <div className="waterfall-item borderR12 screen_mid" >
                        <div className="waterfall-item borderR12 screen_mid_inner1 bg1 pa24 flexS cardBox" >
                            <img alt="Silhouette of a person's head" src="https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7" />
                            <div className="maH12">
                                <h4 className="fontB">Anln</h4>
                                <span className="fontSmall">疯狂努力拼搏中...</span>
                            </div>
                        </div>
                        <div className="screen_mid_inner2">
                        <TimeWeather/>
                        </div>
                    </div>
                    <div className="waterfall-item borderR12 item2" >
                        <div className="waterfall-item borderR12 item2_inner1 bg1 pa24 cardBox" >
                            <MusicPlayer/>
                        </div>
                        <div className="waterfall-item  item2_inner2 cardBox" >
                            <ExamCountdown/>
                        </div>
                        <div className="waterfall-item borderR12 item2_inner3 screen_big" >
                            <div className="waterfall-item borderR12 item2_inner3_inner1 bg1 pa24 flexS cardBox" >
                                <img alt="Silhouette of a person's head" src="https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7" />
                                <div className="maH12">
                                    <h4 className="fontB">Anln</h4>
                                    <span className="fontSmall">疯狂努力拼搏中...</span>
                                </div>
                            </div>
                            <TimeWeather/>
                        </div>
                    </div>
                    <div className="newsBox waterfall-item borderR12 item3" >
                        <div className="waterfall-item borderR12 item3_inner1 bg1 pa24 cardBox" >
                            <h3 className="title maB12 flexB">
                                <span>最新动态</span> <div className="cursor icon_hover"><IonIcon icon={menu} size="36px"></IonIcon></div>
                            </h3>
                            <ul className="widthFull">
                                <li className="newsItemBox flexB maB6 paV6">
                                    <span className="textSingeLine maR12 font14">人间有神兽，来自九重天</span>
                                    <span className="fontSmall gray">2023/09/05</span>
                                </li>
                                <li className="newsItemBox flexB maB6 paV6 font14">
                                    <span className="textSingeLine maR12">一部关于电影浪漫的作品，欢迎光临梦想与拼搏的世界！ </span>
                                    <span className="fontSmall gray">2023/09/05</span>
                                </li>
                                <li className="newsItemBox flexB maB6 paV6 font14">
                                    <span className="textSingeLine maR12">主题曲是花谱唱的，很好听</span>
                                    <span className="fontSmall gray">2023/09/05</span>
                                </li>
                                <li className="newsItemBox flexB maB6 paV6 font14">
                                    <span className="textSingeLine maR12">探索属于你的新世界</span>
                                    <span className="fontSmall gray">2023/09/05</span>
                                </li>
                            </ul>
                        </div>
                        <div className="waterfall-item borderR12 item3_inner2 bg1 pa24 cardBox messagesBox flexSS column " >
                            <h3 className="title maB12 flexB widthFull">
                                <span>粉丝留言</span> <div className="cursor icon_hover"><IonIcon icon={menu} size="36px"></IonIcon></div>
                            </h3>
                            <div className="content flexB column flexFull widthFull">
                                <div className="messageInnerBox bg3 borderR6 pa12 flexFull maB12 widthFull flexBS column">
                                    <div className="font14">6月生日冠名争夺战结束,恭喜粉丝为@时代少年团-贺峻霖解锁惊喜福利</div>
                                    <div className="flexB gray widthFull fontSmall"><span>8/23</span><span>四川</span></div>
                                </div>
                                <ul className="flexS widthFull">
                                    <li className="maR12 activeAvatar"><img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7"/></li>
                                    <li className="maR12"><img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.ofjm5a8hxRo_o7HYH3MxQgHaHX?w=202&h=200&c=7&r=0&o=5&pid=1.7"/></li>
                                    <li className="maR12"><img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=234&h=180&c=7&r=0&o=5&pid=1.7"/></li>
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
                        <div className="smoothedLine">
                            <SmoothedLine/>
                        </div>
                       
                    </div>
                    <div className="waterfall-item borderR12 item5 bg1 pa24 cardBox maR0" >
                        <div className="flexB maB24">
                            <h3 className="title">
                                汉英翻译
                            </h3>
                            <div className="flexB">
                                <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="zh"
                                        checked={selectedOption === 'zh'}
                                        onChange={(e)=>{
                                            console.log(e.target.value)
                                            setSelectedOption(e.target.value)
                                        }}
                                        className="maR6"
                                    />
                                    English
                                </label>
                                <label className="maL12">
                                    <input
                                        type="radio"
                                        value="en"
                                        checked={selectedOption === 'en'}
                                        onChange={(e)=>setSelectedOption(e.target.value)}
                                        className="maR6"
                                    />
                                    中文
                                </label>
                                </div>
                                <div className="maL16 paV6 paH12 borderR12 bg2_blue icon_hover cursor flexB" onClick={handleTranslate}>
                                    <IonIcon icon={language} size="36px"></IonIcon>
                                    <span className="maL12">翻译</span>
                                </div>
                            </div>
                        </div>
                        <Translate type={selectedOption} ref={childTranslate} showStatusBox={showStatusBox}/>
                    </div>
                </div>
        </div>
    )
}


const mapDispatchToProps = {
    showStatusBox
};


export default connect(null,mapDispatchToProps)(Home)