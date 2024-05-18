import React from "react";
import styles from './index.module.less';
import './index.less';
import WorksShowBox from './components/WorksShowBox';

export default function User(){
    return (
        <div>
            <div className={`${styles.worksShowOutBox} widthFull`}>
                <WorksShowBox/>
            </div>
        </div>
    )
}
