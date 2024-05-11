import React from "react"
import styles from './style.module.less'
import {IonIcon} from "@ionic/react"
import {snow} from 'ionicons/icons';
const OwnSucceed =({message}) => {
    return (
        <div className={`${styles.ownSucceedBox} flexS pa12 borderR6`}>
            <IonIcon icon={snow} />
            <span className="maL6">{message}</span>
        </div>
    )
}

export default OwnSucceed