import React,{useEffect} from "react";
export default function Home(props){
    useEffect(() => {
        console.log('********',props.history)
    }, [])
    return (
        <div>Home</div>
    )
}
