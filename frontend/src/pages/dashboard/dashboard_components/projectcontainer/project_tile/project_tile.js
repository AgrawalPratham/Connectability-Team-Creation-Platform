import React from 'react';
import "./projecttile.css";
import projectImage from '../../../../../images/mountain.png';
import IndicatorButton from './indicator_button/indicatotbutton';
import { Link } from 'react-router-dom';

const ProjectTile = (props) => {

  console.log(props.projectNumber)
  console.log(props.projectData.images)

  return (
    <Link
      to="/project"
      state={{ projectData: props.projectData}}
    >
    <div className="projecttilebox">
      <div className="projectphoto">
        {props.projectData.images && props.projectData.images.length > 0 ?(
            <img src={props.projectData.images[props.projectData.images.length - 1]} alt="Project" />
        ):
        (
              <p>No image available</p>
        )}
        
      </div>

      <div className="projectcontent">
        <div className="projecttilenum">Project #{props.projectNumber}</div>
        <div className="projecttileheading">{props.projectData.project_name}</div>
        <div className="projecttiledesc">
          {props.projectData.project_description}
        </div>
        <div className="indicator">
            <IndicatorButton completed_status={props.projectData.completed}/>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProjectTile;
