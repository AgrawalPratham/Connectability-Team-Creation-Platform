import React from "react";
import "./topcontributor.css";
import Contributor from "./contributortile/contributortile";


const Topcontributor = () => {
  return (
    <div className="outerbox">
      <div className="textcontenttopcontributors">
        <div className="topcontributor">Top Contributor</div>
        <div className="bottomtext">Shoutout TO The Most Volatile People</div>
      </div>
      <div className="contributortile">
      <Contributor/>
      <Contributor/>
      <Contributor/>
      <Contributor/>
      </div>
    </div>
    
  );
};

export default Topcontributor;
