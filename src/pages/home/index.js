import React,{useEffect, useState} from "react";
import './styles.less'
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
        <div className="pa24 bg2_blue">
            <div id="waterfall-container-out">
                <div className="leftBox borderR12 bg1 pa24">

                </div>
                <div id="waterfall-container">
                    <div className="waterfall-item borderR12 item1 bg1 pa24 cardBox" >
                        <h3 className="title">
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
                            <h3 className="title">
                                最新动态
                            </h3>
                        </div>
                        <div className="waterfall-item borderR12 item3_inner2 bg1 pa24 cardBox" >
                            <h3 className="title">
                                粉丝留言
                            </h3>
                        </div>
                    </div>
                    <div className="waterfall-item borderR12 item4 bg1 pa24 cardBox" >
                        <h3 className="title">
                            数据展示
                        </h3>
                    </div>
                    <div className="waterfall-item borderR12 item5 bg1 pa24 cardBox" >
                        <h3 className="title">
                            数据展示
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
