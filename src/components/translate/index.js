import React, {useEffect, useState, forwardRef, useImperativeHandle} from "react"
import CryptoJS from "crypto-js"
import {HttpRequire} from "@/http/require"
import styles from './style.module.less'
import {IonIcon} from "@ionic/react"
import { arrowForward } from 'ionicons/icons';
import {Loader} from "../animaIcons";
const URL = "https://api.fanyi.baidu.com/api/trans/vip/translate"
const Translate =({type,showStatusBox}, ref) => {
    const [str,setStr] = useState('')
    const [translatedStr,setTranslatedStr] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        return ()=>{
            // clearInterval(timer)
        }
    },[])
    useImperativeHandle(
        ref,
        () => ({ handleTranslate })
      );
    const handleTranslate = () => {
        // console.log("str",str)
        setLoading(true)
        const require = new HttpRequire;
        // 要散列的字符串
        const inputString = "Hello, MD5!";

        // 使用MD5算法生成散列值
        const md5Hash = CryptoJS.MD5(inputString);

        // 将散列值转换为16进制字符串
        const md5HashHex = md5Hash.toString(CryptoJS.enc.Hex);
        let api = 20230907001808710
        let api_key = "kih47i5Rj0ODiq4o_zpA"
        let random = '5486985412'
        // console.log(md5HashHex);

        let MD5 = CryptoJS.MD5(api+str+random+api_key);
        let NEW_URL = URL + `?q=${encodeURIComponent(str)}&from=${type}&to=${type=='zh' ? 'en' : 'zh'}&appid=${api}&salt=${random}&sign=${MD5}`
        require.post('translate',{q:str,from:type,to:type=='zh' ? 'en' : 'zh',appid:api,salt:random,sign:MD5}).then(res=>{
            console.log("trans",res)
            setLoading(false)
            if(res.error_code){
                showStatusBox({
                    show:true,
                    message:res.error_msg,
                    status:"warning"
                })
            }else{
                !res.error_code ? 
                setTranslatedStr(res.trans_result) : 
                showStatusBox({
                    show:true,
                    // message:"网络异常，请稍后再试",
                    message:"未填写任何内容，请输入需要翻译的内容",
                    status:"warning"
                })
            }
        }).catch(error=>{
            setLoading(old=>{
                showStatusBox({
                    show:true,
                    // message:"网络异常，请稍后再试",
                    message:error,
                    status:"error"
                })
                return false;
            })
            
        })
        
    }
    return (
        <div className={styles.translateBox}>
            {/* <input placeholder="在这里输入需要翻译的内容..." rows="5" cols="50" type="textarea" className="borderR12"/> */}
            <textarea placeholder="在这里输入需要翻译的内容..." className="borderR12 bg3 pa12 fontB" 
                onChange={(e)=>setStr(e.target.value)}
                onKeyDown={(e)=>{
                    e.key === 'Enter' && handleTranslate()
                }}
                >
                </textarea >
            <div className="flexC">
                {loading ? <Loader/> : <IonIcon  icon={arrowForward} size="18px"></IonIcon>}
            </div>
            <div className="pa12 borderR12 bg3">
                {translatedStr.map((item,index)=><p key={item.dst+index}>{item.dst}</p>)}
            </div>
        </div>
    )
}

<ion-icon name="arrow-forward"></ion-icon>

export default forwardRef(Translate)