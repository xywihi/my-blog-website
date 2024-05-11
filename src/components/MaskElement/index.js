import React,{useEffect} from "react";
import styles from "./index.module.less";
export default function MaskElement({ click,prohibitScroll=true,pointerEvents=false }) {
    useEffect(() => {
        document.querySelector("html").style.overflow = prohibitScroll?"hidden":"auto";
        return () => {
            document.querySelector("html").style.overflow = "auto";
        }
    },[])
    return (
        <div onClick={click} className={`${styles.maskElement} ${pointerEvents && styles.pointerEvents}`}>
        </div>
    )
    // return React.cloneElement(children, { className: "mask-element" });
}