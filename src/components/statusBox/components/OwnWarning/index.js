import React from "react"
import styles from './style.module.less'
import {IonIcon} from "@ionic/react"
import { alertCircleOutline} from 'ionicons/icons';
const OwnWarning =({message}) => {
    return (
        <div className={`${styles.ownWarningBox} flexS pa12 borderR6`}>
            <IonIcon icon={alertCircleOutline} />
            <span className="maL6">{message}</span>
        </div>
    )
}

export default OwnWarning