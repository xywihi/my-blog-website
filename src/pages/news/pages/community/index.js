import React, {useEffect, useState} from "react";
import { eyeOutline, calendarOutline,flameOutline,heartOutline,heart, heartCircle, closeCircle, chatboxEllipses, arrowRedo } from 'ionicons/icons';
import {IonIcon} from "@ionic/react"
import "./index.less";
import {scrollToTop, debounce } from "@/util";
import styles from "./styles.module.less";
import MaskElement from "@/components/MaskElement";


const newDebounce = debounce(function (fn){
    fn&&fn()
},500)
const newsList = [
    {id:0,title:'推动中国金融高质量发展',content:"1月16日，国家主席习近平在中央党校发表重要讲话。习近平强调：要坚定不移走中国特色金融发展之路，推动我国金融高质量发展。",imgUrl:"https://loremflickr.com/473/370/science",likeNum:80,seeNum:320,date:"2024-01-24"},
    {id:1,title:'2023年中国GDP超126万亿 增长5.2%',content:"17日，国家统计局发布数据初步核算2023年中国国内生产总值（GDP）超126万亿元，比上年增长5.2%。",imgUrl:"https://loremflickr.com/473/370/people",likeNum:80,seeNum:320,date:"2024-01-24"},
    {id:2,title:'清华毕业生80%都出国了?校方辟谣',content:"近日，清华就业工作会召，清华大学针对网传的“清华毕业生80%都出国”，作出回应。",imgUrl:"https://loremflickr.com/473/370/school",likeNum:80,seeNum:320,date:"2024-01-24"},
    {id:3,title:'和平统一可能性已丧失?国台办回应',content:"17日，国台办发言人陈斌华就近期两岸热点问题答记者问：我们反对“台独”分裂图谋的行动坚决有力，解决台湾问题的",imgUrl:"https://loremflickr.com/473/370/nation",likeNum:80,seeNum:320,date:"2024-01-24"},
    {id:4,title:'2023年中国出生人口902万人',content:"1月17日，国家统计局发布数据显示，年末全国人口140967万人，比上年末减少208万人，全年出生人口902万人。",imgUrl:"https://loremflickr.com/473/370/china",likeNum:80,seeNum:320,date:"2024-1-13"},
]
function Community(){
    const commentsArr=[
        {
            id:0,
            user:"哈利波特",
            content:"哈哈哈！这技术可以。",
            time:1705471828754,
            likes:12,
            imgUrl:"https://tse1-mm.cn.bing.net/th/id/OIP-C.ofjm5a8hxRo_o7HYH3MxQgHaHX?w=202&h=200&c=7&r=0&o=5&pid=1.7",
        },
        {
            id:1,
            user:"小鲁班",
            content:"哈哈哈！这技术可以。看看接下来的表现吧！",
            time:1705471730118,
            likes:12,
            imgUrl:"https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
            id:2,
            user:"阿尔法",
            content:"哈哈哈！这技术可以。",
            time:1705471600118,
            likes:76,
            imgUrl:"https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=234&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
            id:3,
            user:"詹姆斯",
            content:"哈哈哈！这技术可以。",
            time:1705471550118,
            likes:23,
            imgUrl:"https://tse3-mm.cn.bing.net/th/id/OIP-C.dN6NLMe9_qgenDX1VRyOOQAAAA?w=158&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
            id:4,
            user:"约翰·凯尔",
            content:"哈哈哈！这技术可以。",
            time:1705471430118,
            likes:2,
            imgUrl:"https://tse2-mm.cn.bing.net/th/id/OIP-C.yUorDiY6WO0l_0p-5aNtqQHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7",
        },
        {
            id:5,
            user:"小宇宙",
            content:"哈哈哈！这技术可以。",
            time:1705470730118,
            likes:0,
            imgUrl:"https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
            id:6,
            user:"魔镜本源",
            content:"哈哈哈！这技术可以。",
            time:1705443730118,
            likes:0,
            imgUrl:"https://tse2-mm.cn.bing.net/th/id/OIP-C.yUorDiY6WO0l_0p-5aNtqQHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7",
        },
        {
            id:7,
            user:"阿尔法",
            content:"哈哈哈！这技术可以。",
            time:1705431730118,
            likes:0,
            imgUrl:"https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=234&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
            id:8,
            user:"詹姆斯",
            content:"哈哈哈！这技术可以。",
            time:1705421730118,
            likes:0,
            imgUrl:"https://tse3-mm.cn.bing.net/th/id/OIP-C.dN6NLMe9_qgenDX1VRyOOQAAAA?w=158&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
            id:9,
            user:"约翰·凯尔",
            content:"哈哈哈！这技术可以。",
            time:1705421730118,
            likes:0,
            imgUrl:"https://tse2-mm.cn.bing.net/th/id/OIP-C.yUorDiY6WO0l_0p-5aNtqQHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7",
        },
        {
            id:10,
            user:"小宇宙",
            content:"哈哈哈！这技术可以。",
            time:1705421730118,
            likes:0,
            imgUrl:"https://tse1-mm.cn.bing.net/th/id/OIP-C.yMIHLghWfARYn23xKJFeZgHaG1?w=195&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
            id:11,
            user:"魔镜本源",
            content:"哈哈哈！这技术可以。",
            time:1700972031240,
            likes:0,
            imgUrl:"https://tse2-mm.cn.bing.net/th/id/OIP-C.yUorDiY6WO0l_0p-5aNtqQHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7",
        },
    ]
    const [searchedList,setSearchedList] = useState([]);
    const [searchText,setSearchText] = useState('');
    const [selectItem,setSelectItem] = useState(null);
    const [pageScroll,setPageScroll] = useState(false);
    const [showComment,setShowComment] = useState(false);
    useEffect(()=>{
        // 监听页面滚动开始事件
        window.addEventListener('scroll',()=>{
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            if(scrollTop + clientHeight >= scrollHeight){
                setPageScroll(true);
            }else{
                setPageScroll(false);
            }
        })

        
    },[])
    useEffect(() => {
        if(searchText==''){
            setSearchedList(old=>{
                setSelectItem(old=>{
                    return null;
                });
                return []
            })
        }
        
    }, [searchText])
    const getTimeText=(timeNum)=>{
        let timestamp = new Date().getTime();
        let second = Math.ceil((timestamp-timeNum)/1000);
        if(second>59){
            let minutes = Math.ceil(second/60);
            if(minutes>60){
                let hours = Math.ceil(minutes/60);
                if(hours>24){
                    let days = Math.ceil(hours/24);
                    if(days>3){
                        let date=(new Date(timeNum).getMonth()+1)+"/"+new Date(timeNum).getDate();
                        if(new Date().getFullYear()!=new Date(timeNum).getFullYear()){
                            let date=(new Date(timeNum).getFullYear())+"/"+(new Date(timeNum).getMonth()+1)+"/"+new Date(timeNum).getDate();
                            return date;
                        }
                        return date;
                        
                    }
                    return days+"天前";
                }
                return hours+"小时前";
            }
            return minutes+"分钟前";
        }
        return second+"秒前";
    }
    
    const handleSearch=function(e){
        
        let eventValue=e.target.value;
        
        newDebounce(function (){
            if(eventValue=='')return;
            let list = newsList.filter((item,index)=>{
                return item.title.indexOf(eventValue)!=-1
            })
            setSearchedList(oldList=>{
                setSelectItem(null)
                return list
            });
            // console.log('list');
        })
        setSearchText(old=>{
            if(eventValue!=''){
                
                return eventValue
            }
            return eventValue
        
        })
        
    }

    const handleSelectItem = (item)=>{
        scrollToTop(2.5);
        setSelectItem(old=>{
            setSearchText(item.title)
            return item
        });
    }
    
    
    return (
        <div className={`community_out_box ${selectItem ? 'paT48' : 'paT64'}`}>
            <div>
                <div className={`flexB mobile_search bg4 ${selectItem ? 'paV4 paH12' : 'pa12'}`}>
                    <input className="font18 textColorGgray" placeholder="通过关键词搜索..." onChange={handleSearch} value={searchText}/>

                    {
                        searchText &&
                        <div className="search_btn font24 bg4 widthFull textColorGgray" onClick={()=>setSearchText('')}>
                            <IonIcon icon={closeCircle} size="36px"></IonIcon>
                        </div>
                    }
                </div>
                {
                    !searchedList.length && searchText && !selectItem && <p className="maB24">没有匹配的资源...</p>
                }
                {
                    selectItem ?
                    <div className="hotestNews pa24">
                        <div className="maB12">
                            <img className="borderR6"  src={selectItem?.imgUrl}/>
                            <div></div>
                        </div>
                        <div className="hotestNews_content_box scrollbarBox">
                            <h2 className="maB6 fontB">{selectItem?.title}</h2>
                            <hr className="maV12 opacity20"/>
                            <div className="news_content_box_text">
                                <section className="maB12">
                                2023年电影春节档，《流浪地球2》《满江红》上映数日即以逾10亿元票房一路“领跑”。其中，科幻背景的《流浪地球2》不仅取得了票房的成功，也带火了包括浸没液冷计算机、外骨骼等“黑科技”。
                                </section>
                                <section className="maB12">实际上，《流浪地球2》中多次出现的“外骨骼”近年来正逐步开启商业化。</section>
                                <section className="maB12">
                                据《中国基金报》刊文介绍，随着感知计算技术和传感系统发展日益成熟，机器人研发方向从人机协作逐步迈向人机融合，逐渐成为人类身体的一部分。
                                </section>
                                <section className="maB12">
                                从流程上看，外骨骼即从依赖硬件传感器收集人体生物电信号，发展成为将硬件客观数据与人体主观信息相结合的新型信息输入方式。
                                </section>
                                <section className="maB12">
                                信息接收后，机器的计算能力与人体的思维能力进行信息处理，再通过机器的算法能力与人体的决策能力互相协调、优化判断后进行智能输出，将人体智能与机器智能相融合，从单向输出转为双向互动，从而形成更高效的人机一体化智能科学系统。
                                </section>
                                <section className="maB12">
                                值得注意的是，就在《流浪地球2》上映前不久，今年1月18日，工业和信息化部等十七部门印发了关于“机器人+”应用行动实施方案的通知。其中也明确提到了对发展外骨骼机器人的支持。
                                </section>
                                <section className="maB12">与电影中稍有不同的是，工信部此番实施方案将外骨骼机器人的发展放在养老服务方面。</section>
                                
                            </div>
                        </div>
                    </div> :
                    searchText!='' &&
                    (searchedList.length>0 ) ?
                    <ul className="searchList maT24 newest_news_box_content_box">
                            {
                            searchedList.map((item,index)=>{
                                return(
                                    <li key={item.id} className="borderR12 bg3" onClick={()=>handleSelectItem(item)}>
                                        <div className="flexS borderR12 bg2 pa12">
                                            <img src={item.imgUrl}/>
                                            <div>
                                                <h3 className="maB6 textSingeLine">{item.title}</h3>
                                                <p className="content ellipsis-multiline">{item.content}</p>
                                            </div>
                                        </div>
                                        <div className="bottomContent_box flexB pa12">
                                            <div className="flexB">
                                                <p className="maR12 flexB"><IonIcon icon={eyeOutline} size="36px"></IonIcon><span className="maL6">{item.seeNum}</span></p>
                                                <p className="flexB"><IonIcon icon={flameOutline} size="36px"></IonIcon><span className="maL6">{item.likeNum}</span></p>
                                            </div>
                                            <p className="flexB">
                                                <IonIcon icon={calendarOutline} size="36px"></IonIcon><span className="maL6">{item.date}</span>
                                            </p>
                                        </div>
                                    </li>
                                )   
                            })
                            }
                    </ul> :null
                    

                }
            </div>
            {/* 详情按钮 */}
            {
                selectItem &&
                <div className={`${styles.btns_box} ${pageScroll ? "opacity0" : "opacity100"}`}>
                    <div>
                        <div className="colorRed"><IonIcon icon={heart} className=""></IonIcon></div>
                        <p className="maT6">{selectItem.likeNum}</p>
                    </div>
                    <div>
                        <div><IonIcon icon={chatboxEllipses} className="" onClick={()=>{setShowComment(true)}}></IonIcon></div>
                        <p className="maT6">{selectItem.seeNum}</p>
                    </div>
                    <div>
                        <div><IonIcon icon={arrowRedo} className=""></IonIcon></div>
                        <p className="maT6">{selectItem.seeNum}</p>
                    </div>
                </div>
            }
            {/* 详情评论区 */}
            {
                showComment && 
                <div className={`${styles.comment_box} scrollbarBox borderTR12`}>
                    <MaskElement click={()=>{setShowComment(false)}}/>
                    <div className={`${styles.comment_header_out_box} bg1 pa24`}>
                        <div className={`${styles.comment_header_box} flexB`}>
                            <h3 className="maB6 fontB">评论区</h3>
                            <p className="font14">总共120条</p>
                        </div>
                        <hr className="opacity20"/>
                    </div>
                    <div className={`${styles.comment_area_box} bg1 pa24`}>
                            
                            <div className="borderR6 hotestNews_comment_area_box scrollbarBox">
                                <ul className="borderR6 hotestNews_comment_area_box_text">
                                    {commentsArr.map((item,index)=>(
                                        <li key={item.id}>
                                            <img src={item.imgUrl}/>
                                            <div className="widthFull">
                                                <div className="flexB  maB6">
                                                    <div>
                                                        <p className="name font14textColorGgray">{item.user}</p>
                                                        <p className="content flexB">{item.content}</p>
                                                    </div>
                                                    <div className="flexB maL12"><IonIcon icon={item.likes>0?heart:heartOutline} color={"#fff"} size="36px"></IonIcon><span className="maL3 fontSmall">{item.likes ? item.likes : "" }</span></div>
                                                </div>
                                                <p className="font10 maT3 textColorGgray">{getTimeText(item.time)}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                </div>
            }
            {
                !searchedList.length && !selectItem &&
                <div className="community_box">
                    <div>
                    <h2 className="maB12">最新动态</h2>
                    <div className="hotestNews_box bg1 borderR12">
                        <div className="hotestNews pa24">
                            <div className="maB12">
                                <img className="borderR6"  src={"https://loremflickr.com/473/370/mountain"}/>
                                <div></div>
                            </div>
                            <div className="hotestNews_content_box scrollbarBox">
                                <h2 className="maB6 fontB">科技前沿 | 《流浪地球2》的这项“黑科技”,获工信部支持</h2>
                                <hr className="maV12 opacity20"/>
                                <div className="hotestNews_content_box_text">
                                    <section className="maB12">
                                    2023年电影春节档，《流浪地球2》《满江红》上映数日即以逾10亿元票房一路“领跑”。其中，科幻背景的《流浪地球2》不仅取得了票房的成功，也带火了包括浸没液冷计算机、外骨骼等“黑科技”。
                                    </section>
                                    <section className="maB12">实际上，《流浪地球2》中多次出现的“外骨骼”近年来正逐步开启商业化。</section>
                                    <section className="maB12">
                                    据《中国基金报》刊文介绍，随着感知计算技术和传感系统发展日益成熟，机器人研发方向从人机协作逐步迈向人机融合，逐渐成为人类身体的一部分。
                                    </section>
                                    <section className="maB12">
                                    从流程上看，外骨骼即从依赖硬件传感器收集人体生物电信号，发展成为将硬件客观数据与人体主观信息相结合的新型信息输入方式。
                                    </section>
                                    <section className="maB12">
                                    信息接收后，机器的计算能力与人体的思维能力进行信息处理，再通过机器的算法能力与人体的决策能力互相协调、优化判断后进行智能输出，将人体智能与机器智能相融合，从单向输出转为双向互动，从而形成更高效的人机一体化智能科学系统。
                                    </section>
                                    <section className="maB12">
                                    值得注意的是，就在《流浪地球2》上映前不久，今年1月18日，工业和信息化部等十七部门印发了关于“机器人+”应用行动实施方案的通知。其中也明确提到了对发展外骨骼机器人的支持。
                                    </section>
                                    <section className="maB12">与电影中稍有不同的是，工信部此番实施方案将外骨骼机器人的发展放在养老服务方面。</section>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="hotestNews_comment_area bg3 pa24">
                            <div className="hotestNews_comment_header_box flexB">
                                <h3 className="maB6 fontB">评论区</h3>
                                <p>总共120条</p>
                            </div>
                            <hr className="maV12 opacity20"/>
                            <div className="borderR6 hotestNews_comment_area_box scrollbarBox">
                            <ul className="borderR6 hotestNews_comment_area_box_text">
                                {commentsArr.map((item,index)=>(
                                    <li key={item.id}>
                                        <img src={item.imgUrl}/>
                                        <div className="widthFull">
                                            <div className="flexB">
                                                <div>
                                                    <p className="name textColorGgray2">{item.user}</p>
                                                    <p className="content flexB">{item.content}</p>
                                                </div>
                                                <div className="flexB maL12"><span className="maR3 fontSmall">{item.likes ? item.likes : "" }</span><IonIcon icon={item.likes>0?heart:heartOutline} color={"#fff"} size="36px"></IonIcon></div>
                                            </div>
                                            <p className="font10 maT3 textColorGgray">{getTimeText(item.time)}</p>
                                        </div>
                                    </li>
                                ))}
                                
                                
                            </ul>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="newest_news_box">
                        <div className="header_box flexBS maB12">
                            <h2>社区动态</h2>
                            <div className="flexB">
                                <input className="pa12" placeholder="通过关键词搜索..."/>
                                <div className="search_btn bg4 widthFull paH12 textColorWhite">
                                    搜索
                                </div>
                            </div>
                        </div>
                        <div className="borderR12 newest_news_box_content_outbox scrollbarBox">
                            <ul className="borderR6 newest_news_box_content_box">
                                    {
                                        newsList.map((item,index)=>(
                                            <li key={item.id} className="borderR12 bg3" onClick={()=>handleSelectItem(item)}>
                                                <div className="flexS borderR12 bg2 pa12">
                                                    <img src={item.imgUrl}/>
                                                    <div>
                                                        <h3 className="maB6 textSingeLine">{item.title}</h3>
                                                        <p className="content ellipsis-multiline">{item.content}</p>
                                                    </div>
                                                </div>
                                                <div className="bottomContent_box flexB pa12">
                                                    <div className="flexB">
                                                        <p className="maR12 flexB"><IonIcon icon={eyeOutline} size="36px"></IonIcon><span className="maL6">{item.seeNum}</span></p>
                                                        <p className="flexB"><IonIcon icon={flameOutline} size="36px"></IonIcon><span className="maL6">{item.likeNum}</span></p>
                                                    </div>
                                                    <p className="flexB">
                                                        <IonIcon icon={calendarOutline} size="36px"></IonIcon><span className="maL6">{item.date}</span>
                                                    </p>
                                                </div>
                                            </li>
                                        ))
                                    }
                                    
                                    
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Community
