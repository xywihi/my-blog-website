import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import  "./index.less";
import Image from "@/components/Image";
import { useNavigate } from "react-router-dom";
import shu from "@/assets/images/farm/shu.png";
import bg from "@/assets/images/farm/bg.png";     
import bg1 from "@/assets/images/farm/bg1.png";     
import clouds from "@/assets/images/farm/clouds.png";     
import pengshui from "@/assets/images/farm/pengshui.gif";
import fei from "@/assets/images/farm/fei.gif";
import icon from "@/assets/images/farm/icon.png";
import icon2 from "@/assets/images/farm/icon2.png";
import icon3 from "@/assets/images/farm/icon3.png";
import icon4 from "@/assets/images/farm/icon4.png";
import shuihu from "@/assets/images/farm/shuihu.png";
import feiliao from "@/assets/images/farm/feiliao.png";
// import TopNav from "@/common/TopNav";
// import { t } from "i18next";
// import { LeftOutline } from "antd-mobile-icons";
// import { toWatering,collectCheck } from "@/api";
const FarmOutBox = ({hNum}) => {
  const [isWatering, setIsWatering] = useState(false);
  const [isFertilizer, setIsFertilizer] = useState(false);
  const [clickTree, setClickTree] = useState(false);
  
  const history = useNavigate();
  const [collection, setCollection] = useState({
    watering: 0,
    fertilize: 0,
    weeding: 0,
    carbon: 0,
  });

  useEffect(()=>{
    // collectCheck().then((res) => {
    //   let data = {
    //     watering: res.data.watering,
    //     fertilize: res.data.fertilize,
    //     weeding: res.data.weeding,
    //     carbon: res.data.carbon,
    //   };

    //   setCollection(data);
    // });
  },[])

  let toBack = () => {
    history.goBack();
  };
  // let handleWatering = () => {
  //   toWatering({ type: 0 }).then((res) => {
  //     setIsWatering(true);

  //     setTimeout(() => {
  //       setIsWatering(false);
  //     }, 1000);
  //   });
  // };
  // let toApplyFertilizer = () => {
  //   toWatering({ type: 1 }).then((res) => {
  //     setIsFertilizer(true);

  //     setTimeout(() => {
  //       setIsFertilizer(false);
  //     }, 1000);
  //   });
  // };
  let handleDo = (type) => {
    switch (type) {
      case 'watering':
        setCollection({...collection,watering:1})
        // Toast.show({
        //   icon: "success",
        //   content: 'Watering Success',
        //   position: "center",
        // });
        break;
      case 'fertilize':
        setCollection({...collection,fertilize:1})
        // Toast.show({
        //   icon: "success",
        //   content: 'Fertilize Success',
        //   position: "center",
        // });
        break;
      case 'weeding':
        setCollection({...collection,weeding:1})
        // Toast.show({
        //   icon: "success",
        //   content: 'Weeding Success',
        //   position: "center",
        // });
        break;
      case 'carbon':
        setCollection({...collection,carbon:1})
        // Toast.show({
        //   icon: "success",
        //   content: 'Carbon Success',
        //   position: "center",
        // });
        break;
    
      default:
        break;
    }
    
     
      
  };
  // let handleClickTree = () => {
  //   setClickTree(true)
  //   setTimeout(() => {
  //     setClickTree(false)
  //   }, 1000);
  // };

  let getEnergy = ()=>{
   
    if(Object.values(collection).every(item=>item)){
      toWatering({collection:collection})
    }else{
    //   Toast.show({
    //       icon: "fail",
    //       content: t('not_finish_task'),
    //       position: "top",
    //     });
    }
  }
  return (
    <div className={`farmBox_${hNum} borderR12`}>
      {/* <div className="top">
        <TopNav
          back={null}
          left={
            <span style={{ fontWeight: "bold" }} onClick={toBack} >
              <LeftOutline />
              {t("farm")}
            </span>
          }
          right="English"
        />
      </div> */}
      <div  className="main borderR12" style={{ backgroundImage: `url(${bg})` }}>
      <div className="clouds heightFull">
        <Image src={clouds}  fit="cover" />
      </div>
      <div className="bg2_img heightFull">
        <Image src={bg1} height="117%" fit="cover" />
      </div>
      {Object.values(collection).every(item=>item) && <div className='radiuBox' count={'Get'}
        onClick={()=>{
          if(collection.watering == 1 && collection.fertilize == 1 && collection.carbon == 1 && collection.weeding == 1){
            getEnergy()
          }else{
            // Toast.show({
            //   icon: "fail",
            //   content: 'Please finish all the tasks first',
            //   position: "center",
            // });
          }
        }}
      >
          
          <div className="waters">
            {/* <Radiu></Radiu>
            <RadiuInner></RadiuInner> */}
          </div>
        </div>}
      {/* <Button  radius="10"
              content={t("get")}
              color="#fff"
              background="#00B578"
              height={48}
              width={48}
              onClick={getEnergy}/> */}
      <div className="tree heightFull widthFull" >
        <Image src={shu} height="117%" fit="cover" />
      </div>
      <div className="pengshui">
        <Image
          src={pengshui}
          id="water"
          width={200}
          fit="cover"
          style={{ opacity: 0 }}
          className={isWatering ? "show-water" : ""}
        />
      </div>

      <div className="fei">
        <Image
          src={fei}
          id="fei"
          width={60}
          height={60}
          fit="cover"
          style={{ opacity: 0 }}
          className={isFertilizer ? "show-fei" : ""}
        />
      </div>

      <div className="btns">
      <div className="btn" style={{ zIndex: 6 }}
      onClick={()=>handleDo('carbon')}
      >
          <Image
            className="btn"
            src={icon4}
            height={46}
            width={46}
            fit="cover"
            style={{width:'60px'}}
          />
        </div>
        <div className="btn"
          onClick={()=>handleDo('watering')}
        >
          <Image
            className="btn"
            src={icon}
            id="fei"
            width={46}
            height={46}
            fit="cover"
          />
        </div>
        
        <div className="btn" style={{ zIndex: 6 }}
        onClick={()=>handleDo('weeding')}
        >
          <Image
            className="btn"
            src={icon3}
            height={46}
            width={46}
            fit="cover"
            style={{width:'60px'}}
          />
        </div>
        <div className="btn" style={{ zIndex: 6 }}
           onClick={()=>handleDo('fertilize')}
        >
          <Image
            className="btn"
            src={icon2}
            height={46}
            width={46}
            fit="cover"
            style={{width:'60px'}}
          />
        </div>
       
      </div>

      <div className={isWatering ? "hu shake-shuihu" : " hu"}>
        <Image src={shuihu} width={80} height={80} fit="cover" />
      </div>

      <div className={isFertilizer ? "feiliao shake-feiliao" : "feiliao"}>
        <Image src={feiliao} width={60} height={60} fit="contain" />
      </div>
      </div>
    </div>
  );
};

const getStoreData = (state) => {
  return {
    // staticData: state.staticData.data,
  };
};
const dispatchAction = (dispatch, ownProps) => {
  return {};
};

export default connect(getStoreData, dispatchAction)(FarmOutBox);
