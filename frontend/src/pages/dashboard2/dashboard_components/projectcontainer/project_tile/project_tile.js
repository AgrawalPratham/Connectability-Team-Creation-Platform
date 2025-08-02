import React from 'react';
import "./projecttile.css";
import projectImage from '../../../../../images/mountain.png';
import IndicatorButton from './indicator_button/indicatotbutton';

const ProjectTile = () => {
  return (
    <div className="projecttilebox">
      <div className="projectphoto">
        <img src={projectImage} alt="Project" />
      </div>

      <div className="projectcontent">
        <div className="projecttilenum">Project #1</div>
        <div className="projecttileheading">Stock Price Prediction</div>
        <div className="projecttiledesc">
          As Uber works through a huge amount of internal management turmoil.
        </div>
        <div className="indicator">
            <IndicatorButton/>
        </div>
      </div>
    </div>
  );
};

export default ProjectTile;
