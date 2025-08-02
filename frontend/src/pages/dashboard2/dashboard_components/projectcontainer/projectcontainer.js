import React from "react";
import "./projectcontainer.css";
import plus from '../../../../images/plus.png'
import ProjectTile from "./project_tile/project_tile";


const CreateProjectButton = () => {
  return (
    <div className="outerbox">
      <div className="textcontentproject">
        <div className="Projecttext">Project</div>
        <div className="bottomtext">Add Projects have fun..</div>
      </div>
        
      <div className="project-container">
        <a href="something" className="createnewproject-link">
          <div className="createnewproject">
            <div className="plusimage">
              <img src={plus} alt="Plus Icon" />
            </div>
            <div className="testcreatenewproject">Create a New Project</div>
          </div>
        </a>
        <div className="projectile">
          <ProjectTile/>
        </div>
        
      </div>
    </div>
  );
};
export default CreateProjectButton;
