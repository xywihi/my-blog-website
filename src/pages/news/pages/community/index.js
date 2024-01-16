import React, {useEffect} from "react";
import "./index.less";
function Community(){
    useEffect(() => {
        return () => {
            console.log('我被销毁了')
        }
    }, [])
    return (
        <div className="community_box">
            <div className="hotestNews_box bg1 borderR12 pa24">
                <div className="hotestNews">
                    <div className="maB12">
                        <img className="borderR6"  src={"https://loremflickr.com/473/370/mountain"}/>
                        <div></div>
                    </div>
                    <div className="hotestNews_content_box">
                        <h2 className="maB6 fontB">科技前沿 | 《流浪地球2》的这项“黑科技”,获工信部支持</h2>
                        <hr className="maV12 opacity20"/>
                        <p>
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
                            
                        </p>
                    </div>
                </div>
                <div className="hotestNews_comment_area paH12">
                    <h3 className="maB6 fontB maB12">评论区</h3>
                    <ul className="bg3 pa12 borderR6">
                        <li>
                            <p>哈哈哈！这技术可以。</p>
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default Community
