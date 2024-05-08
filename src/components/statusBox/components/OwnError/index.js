import React  from "react"
import styles from './style.module.less'
import {IonIcon} from "@ionic/react"
import { closeOutline } from 'ionicons/icons';
const OwnError =({message}) => {
    return (
        <div className={`${styles.ownErrorBox} flexS pa12 borderR6` }>
            <IonIcon icon={ closeOutline } />
            <span className="maL6">{message}</span>
        </div>
    )
}

export default OwnError;