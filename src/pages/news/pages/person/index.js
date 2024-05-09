import React, {useEffect} from "react";
function Person(){
    useEffect(() => {
        return () => {
            // console.log('我被销毁了')
        }
    }, [])
    return (
        <div>person</div>
    )
}

export default Person
