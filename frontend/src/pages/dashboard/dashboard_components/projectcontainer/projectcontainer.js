import React from "react";
import "./projectcontainer.css";
import plus from '../../../../images/plus.png'
import ProjectTile from "./project_tile/project_tile";
import { Link } from "react-router-dom";


const CreateProjectButton = (props) => {


  console.log("Props successfully passed")
  console.log(props.userProjects)

  return (
    <div className="outerbox">
      <div className="textcontentproject">
        <div className="Projecttext">Project</div>
        <div className="bottomtext">Add Projects have fun..</div>
      </div>
        
      <div className="project-container">

      <div className="projectile">
        {props.userProjects != null?(
            
              props.userProjects.map((project, index) => (
                <ProjectTile key={index} projectData={project} projectNumber={1 + index} />
              ))
            
        ):(<></>)}
          
        </div>


        <Link to="/createproject" className="createnewproject-link">
          <div className="createnewproject">
            <div className="plusimage">
              <img src={plus} alt="Plus Icon" />
            </div>
            <div className="testcreatenewproject">Create a New Project</div>
          </div>
        </Link>
       
        
      </div>
    </div>
  );
};
export default CreateProjectButton;
