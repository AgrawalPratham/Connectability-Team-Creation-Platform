import React from 'react';
import './contributortile.css';
import contributorpicture from "../../../../../images/mountain.png"
export const Contributor = () => {
  return (
    <div className="contributorbox">
      <div className="contributorimage">
        <img src={contributorpicture} alt="Mitchel Starc" />
      </div>
      <div className="contributorname">
        Mitchel Starc
      </div>
    </div>
  );
};

export default Contributor;
