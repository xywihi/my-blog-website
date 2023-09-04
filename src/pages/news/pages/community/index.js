import React, {useEffect} from "react";
function Community(){
    useEffect(() => {
        return () => {
            console.log('我被销毁了')
        }
    }, [])
    return (
        <div>Community</div>
    )
}

export default Community
