import * as React from 'react';
import './PreviewWindow.css'

function PreviewWindow(props){

    return (

        <div className = "window">
            <img className = "thumbnail" src={props.thumbnailURL} alt = "thumbnail"/>
            <div className = "previewInfo">
                <div className = "sellerInfo">
                    <img className = 'profileImg' src={props.profileURL} alt = "profileImg"/>
                    <p className = "sellerName">{props.sellerName}</p> 
                </div>
                <div className = "itemInfo">
                    <p className = "title">{props.title}</p>
                    <p className = "location">{props.location}</p>
                </div>
            </div>       
        </div>

    )
              
}

export default PreviewWindow;