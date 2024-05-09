import React,{useRef,useState, useEffect} from 'react';
import styles from './styles.module.less'
import {debounce} from '@/util/tools.ts'
 const OwnSlider = ({handleChangeTime,currentTime,duration,pauseMusic}) => {
    const sliderRef = useRef(null);
    const sliderOldRef = useRef(null);
    const circleRef = useRef(null);
    const sliderDragRef = useRef(null);
    const sliderOldDragRef = useRef(null);
    const circleDragRef = useRef(null);
    const [showDrag,setShowDrag] = useState(false);
    const [position,setPosition] = useState(0);
    useEffect(()=>{
        const sliderPosition = sliderRef.current.getBoundingClientRect();
        let difference = currentTime/duration;
        circleRef.current.style.left = (sliderPosition.right - sliderPosition.left) * difference + 'px';
        sliderOldRef.current.style.width = ((sliderPosition.right - sliderPosition.left) * difference + 4) + 'px';
    },[currentTime])
    const handleClickSlider = (e) => {
        const sliderPosition = sliderRef.current.getBoundingClientRect();
        // 获取滑块的被点击的位置
        const clickPosition = e.clientX - sliderPosition.left;
        // console.log(sliderPosition);
        if(circleRef.current){
            circleRef.current.style.left = (clickPosition-10)+'px';
             // 计算滑块的百分比
            const percentage = clickPosition / sliderPosition.width;
            // console.log(percentage)
            debounce(handleChangeTime(percentage),10000)
        }
    }

    const handleMoveCircle = (e) => {
        // // 获取滑块的当前位置
        const circleDragPosition = circleDragRef.current?.getBoundingClientRect();
        const sliderDragPosition = sliderDragRef.current?.getBoundingClientRect();
        // // 获取滑块的被点击的位置
        
        const clickPosition = e.clientX - sliderDragPosition.left;
        // // console.log(clickPosition);
        // 查看是否向左拖动
        if(e.clientX>=sliderDragPosition.left && e.clientX<=(sliderDragPosition.right-circleDragPosition.width/2)){
            // // console.log('clickPosition',circleRef.current.style.left,e.clientX ,sliderDragPosition.right);
            // let difference = e.clientX-circleDragPosition.left
            circleDragRef.current.style.left = (clickPosition-10)+'px';
        }
        
        // 计算滑块的百分比
        const percentage = (circleDragPosition.left - sliderDragPosition.left) / (sliderDragPosition.right - sliderDragPosition.left);
        // console.log(percentage)
        // debounce(handleChangeTime(percentage),10000)
    }

    const handleShowDrag = (e) => {
        setShowDrag(!showDrag);
        if(e.type==='touchStart'){
            const sliderDragPosition = sliderRef.current.getBoundingClientRect();
            let difference = currentTime/duration;
            circleDragRef.current.style.left = (sliderDragPosition.right - sliderDragPosition.left) * difference + 'px';
            sliderOldDragRef.current.style.width = ((sliderDragPosition.right - sliderDragPosition.left) * difference + 4) + 'px';
        }else{
            // if(circleRef.current){
            //     circleRef.current.style.left = (clickPosition-10)+'px';
            //      // 计算滑块的百分比
            //     const percentage = clickPosition / sliderPosition.width;
            //     // console.log(percentage)
            //     debounce(handleChangeTime(percentage),10000)
            // }
        }
        
    }
    // const handleMoveDrag = (e) => {
    //     const circleDragPosition = circleDragRef.current?.getBoundingClientRect();
    //     const sliderDragPosition = sliderDragRef.current?.getBoundingClientRect();
    //     if((e.touches[0].pageX+20)>=sliderDragPosition.left && e.touches[0].pageX<=(sliderDragPosition.right-circleDragPosition.width/2)){
    //         // // console.log('clickPosition',circleRef.current.style.left,e.clientX ,sliderDragPosition.right);
    //         // let difference = e.clientX-circleDragPosition.left
    //         circleDragRef.current.style.left = (e.touches[0].pageX-60)+'px';
    //     }
    // }

    const handleMoveDrag = (e) => {
        const circleDragPosition = circleDragRef.current?.getBoundingClientRect();
        const sliderDragPosition = sliderDragRef.current?.getBoundingClientRect();
        const sliderPosition = sliderRef.current?.getBoundingClientRect();
        if(e.type==="touchmove"){
            if((e.touches[0].pageX+20)>=sliderDragPosition.left && e.touches[0].pageX<=(sliderDragPosition.right-circleDragPosition.width/2)){
                circleDragRef.current.style.left = (e.touches[0].pageX-60)+'px';
                sliderOldDragRef.current.style.width = (e.touches[0].pageX-20)+'px'
                setPosition(e.touches[0].pageX-40)
            }
        }else if(e.type==="touchend"){
             if(circleRef.current){
                circleRef.current.style.left = (position-10)+'px';
                // 计算滑块的百分比
                const percentage = position / sliderPosition.width;
                debounce(handleChangeTime(percentage),10000)
                setShowDrag(!showDrag);
            }
        }
    }
    return (
        <div className="no-select" onTouchStart={handleShowDrag} onTouchEnd={handleMoveDrag} onTouchMove={handleMoveDrag}>
            <div className={styles.ownSliderBox} style={{visibility:showDrag?'hidden':'visible'}}>
                <div ref={sliderRef} onClick={handleClickSlider} className={styles.ownSlider}></div>
                <div ref={sliderOldRef} className={styles.ownSliderOld}></div>
                <div ref={circleRef} className={styles.ownCircle}></div>
            </div>
            <div className={styles.ownDragNox} style={{visibility:showDrag?'visible':'hidden'}}>
                <div ref={sliderDragRef} onClick={handleClickSlider} className={styles.ownSlider}></div>
                <div ref={sliderOldDragRef} className={styles.ownSliderOld}></div>
                <div ref={circleDragRef} className={styles.ownCircle} onDragEnd={()=>pauseMusic(true)} onDrag={handleMoveCircle} ></div>
            </div>
            
        </div>
    )
}

export default OwnSlider;