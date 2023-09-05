import React, { useEffect } from 'react';

const AudioPlayer = ({resource}) => {
    useEffect(()=>{
        console.log('resource----',resource)
    },[resource])
    return (
        <div>
            <audio className="widthFull" controls>
                <source src={resource} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}

export default AudioPlayer;
