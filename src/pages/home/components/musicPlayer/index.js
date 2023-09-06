import React,{useEffect, useState} from "react";
import styles from './styles.module.less'
import {IonIcon} from "@ionic/react"
import { play, pause } from 'ionicons/icons';
import {connect} from "react-redux"
import {playMusic} from "../../store/actions"
import musc from "../../../../assets/audio/shine.mp3"
import news from "../../../../assets/audio/new.mp3"
import starts from "../../../../assets/audio/starts.mp3"
import AudioPlayer from "../../../../components/audioPlayer"
const audios = [{name:"Shine",resource:musc,pause:false,id:0},{name:"New Normal",resource:news,pause:false,id:1},{name:"we'll be the starts",resource:starts,pause:false,id:2}]
const MusicPlayer = ({music,playMusic}) => {
    const [activeOther,setActiveOther] = useState(null)
    useEffect(() => {
        // throwError()
        // setCurrentAudio(audios[0])
        return ()=>{
        }
    }, [])
    const changeAudio = (item)=>{
        
        playMusic({...item,pause:music ? !music.pause : !item.pause})
        music && setActiveOther(item.id!=music.id)
    }
    return (
        <div className={`${styles.item2_inner1}`} >
            <div className="maB12">
            <AudioPlayer data={music} activeOther={activeOther}/>
            </div>
            <ul>
                {audios.map(item=>
                    <li key={item.id} className="paV12 flexB" onClick={()=>changeAudio(item)}>
                        <span>{item.name}</span>
                        {(music && music.id===item.id) && <IonIcon icon={ (music.pause || activeOther) ? pause : play} size="36px"></IonIcon>}
                    </li>)}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    music: state.home.music,
  });
const mapDispatchToProps = {
    playMusic,
};


export default connect(mapStateToProps,mapDispatchToProps)(MusicPlayer)