import React,{useEffect, useState} from "react";
import './styles.less'
import SmoothedLine from "../../components/echarts/smoothedLine"
export default function Home(props){
    useEffect(() => {
        // throwError()
    }, [])
    // const throwError = () => {
    //     console.log('--------------------', 1/0)
    //     return 1/0
    //     // throw new Error('This is a simulated error.');
    // };
    return (
        <div className="bg2_blue">
            <div id="waterfall-container">
                    <div className="waterfall-item borderR12 item1 bg1 pa24 cardBox" >
                        <h3 className="title maB12">
                            最近状态
                        </h3>
                    </div>
                    <div className="waterfall-item borderR12 item2" >
                        <div className="waterfall-item borderR12 item2_inner1 bg1 pa24 cardBox" ></div>
                        <div className="waterfall-item borderR12 item2_inner2 bg1 pa24 cardBox" ></div>
                        <div className="waterfall-item borderR12 item2_inner3" >
                            <div className="waterfall-item borderR12 item2_inner3_inner1 bg1 pa24 flexS cardBox" >
                                <img alt="Silhouette of a person's head" src="https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7" />
                                <label className="maH12">
                                    <h4 className="fontB">Anln</h4>
                                    <span className="fontSmall">疯狂努力拼搏中...</span>
                                </label>
                            </div>
                            <div className="waterfall-item borderR12 item2_inner3_inner2 bg1 pa24 cardBox" ></div>
                        </div>
                    </div>
                    <div className="waterfall-item borderR12 item3" >
                        <div className="waterfall-item borderR12 item3_inner1 bg1 pa24 cardBox" >
                            <h3 className="title maB12">
                                最新动态
                            </h3>
                        </div>
                        <div className="waterfall-item borderR12 item3_inner2 bg1 pa24 cardBox messagesBox flexSS column " >
                            <h3 className="title maB12">
                                粉丝留言
                            </h3>
                            <div className="content flexB column flexFull widthFull">
                                <div className="messageInnerBox bg3 borderR12 pa12 flexFull maB12 widthFull">
                                6月生日冠名争夺战结束,恭喜粉丝为@时代少年团-贺峻霖解锁惊喜福利,
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
