import React from "react";
import "./SmallHeader.css";

function SmallHeader ({backgroundImage, height, children}){
    return(
            <div className="smallHeader-container" style={{backgroundImage: `url(${backgroundImage})`, height: `${height}`}}>
                <div className="smallHeader-content">
                {children}
                </div>
            </div>
    )
}
export default SmallHeader