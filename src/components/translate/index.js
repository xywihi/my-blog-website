import React, {useEffect, useState, forwardRef, useImperativeHandle} from "react"
import CryptoJS from "crypto-js"
import HttpRequire from "@/http/require"
import styles from './style.module.less'
import {IonIcon} from "@ionic/react"
import { arrowForward } from 'ionicons/icons';
import {Loader} from "../animaIcons"
const URL = "https://fanyi-api.baidu.com/api/trans/vip/translate"
const Translate =({type}, ref) => {
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
        console.log("str",str)
        setLoading(true)
        const require = new HttpRequire;
        // 要散列的字符串
        const inputString = "Hello, MD5!";

        // 使用MD5算法生成散列值
        const md5Hash = CryptoJS.MD5(inputString);

        // 将散列值转换为16进制字符串
        const md5HashHex = md5Hash.toString(CryptoJS.enc.Hex);
        let api = 20230907001808710
        let api_key = "Pw93lz2oNgd95rJzMOns"
        let random = 1435660288
        console.log(md5HashHex);

        let MD5 = CryptoJS.MD5(api+str+random+api_key);
        let NEW_URL = URL + `?q=${encodeURIComponent(str)}&from=${type}&to=${type=='zh' ? 'en' : 'zh'}&appid=${api}&salt=${random}&sign=${MD5}`
        require.get(NEW_URL).then(res=>{
            console.log("trans",res)
            setLoading(false)
            setTranslatedStr(res.trans_result)
        }).catch(error=>{
            console.log(error)
        })
        
    }
    return (
        <div className={styles.translateBox}>
            {/* <input placeholder="在这里输入需要翻译的内容..." rows="5" cols="50" type="textarea" className="borderR12"/> */}
            <textarea placeholder="在这里输入需要翻译的内容..." className="borderR12 pa12 fontB" 
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
                {translatedStr.map(item=><p>{item.dst}</p>)}
            </div>
        </div>
    )
}

<ion-icon name="arrow-forward"></ion-icon>

export default forwardRef(Translate)