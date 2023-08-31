import React, {useEffect} from "react";
function News(){
    useEffect(() => {
        return () => {
            console.log('我被销毁了')
        }
    }, [])
    return (
        <div>News</div>
    )
}

export default News
