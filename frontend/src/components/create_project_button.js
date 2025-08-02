import React from "react";
import "./create_project_button.css";
import plus from '../images/plus.png'

const CreateProjectButton = () => {
  return (
    <div className="outerbox">
      <div className="textcontentproject">
        <div className="Projecttext">Project</div>
        <div className="bottomtext">Add Projects have fun..</div>
      </div>

      <a href="something" className="createnewproject-link">
        <div className="createnewproject">
          <div className="plusimage">
            <img src={plus} alt="Plus Icon" />
          </div>
          <div className="testcreatenewproject">Create a New Project</div>
        </div>
      </a>
    </div>
  );
};

export default CreateProjectButton;
