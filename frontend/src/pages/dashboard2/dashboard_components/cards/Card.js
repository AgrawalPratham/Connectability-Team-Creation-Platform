import React from "react";
import "./Card.css"; 
import cardimage from "../../../../images/mountain.png"

const Card = () => {
    return (
        <div className="cardboundary">
            <div className="cardcontent">
                <div className="cardheading">
                    Connect to Grow
                </div>
                <div className="cardtext"> 
                    Lorem Ipsum is simply dummy text of the printing and a industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an ssum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
            </div>
            <div className="cardphoto">
                <img src={cardimage}/>
            </div>
        </div>
    );
};

export default Card;
