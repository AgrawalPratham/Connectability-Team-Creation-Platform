import React, { useEffect, useState } from 'react'
import './projectDetailRight.css'
import NeedHelp from '../../../components/needhelp.js'
import { Link } from 'react-router-dom';
import { AuthData } from '../../../Auth/AuthWrapper.js';


export default function ProjectDetailRight(props) {

    const { user } = AuthData();

    const [projectTeam, setProjectTeam] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        if (props.projectData) { // Check if projectData is present
            fetch("http://34.143.192.157:8080/teamMembers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ project_id: props.projectData.project_id }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok: " + response.statusText);
                    }
                    console.log("1. Response received");
                    return response.json();
                })
                .then((data) => {
                    console.log("2. JSON parsed");
                    console.log(data);
                    setProjectTeam(data);
                    setIsLoading(false); // Set loading to false once data is fetched
                })
                .catch((error) => {
                    console.log("Error on client side extracting project team data: ", error);
                    setIsLoading(false); // Also set loading to false if there's an error
                });
        }
    }, [props.projectData]); // Add dependency to ensure `useEffect` runs when `props.projectData` changes

    // Ensure data is loaded before rendering
    if (isLoading || !props.projectData) {
        return <div>Loading...</div>; // Show loading indicator
    }



  return (
    <div className='right-container'>
      <div className='team-container'>
        <h3>Active Team</h3>

        <div className='leader-area'>
            <img src={projectTeam?.project_head_image}></img>  
            <h4>{projectTeam?.project_head_name}</h4>  
            <p>Leader</p>   
        </div>

        <div className='team-area'>
            
            {projectTeam.members_data?.map((member, index) =>(
                <div className='individual-team-member'>
                    <img src={member?.member_image}></img>
                    <h5>{member?.member_name}</h5>
                </div>
            ))}
        </div>
      </div>
      <div className='budget-needhelp-container'>
        <div className='budget-container'>
            <h3>Timeline</h3>
                  <h5>Start Date : </h5><p> {props.projectData.start_date}</p>
                  <br></br>
                  <h5>End Date : </h5><p> {props.projectData.end_date}</p>
                  <br></br>
                  <h5>Budget : </h5><p> {props.projectData.budget}</p>
                  <br></br>
        </div>
        <div className='needhelp-container'>
            <NeedHelp />
        </div>
      </div>
      {user.user_email == props.projectData.manager_email ?(
              <div className='add-member-button-area'>
                  <Link to="/invitemembers" state={{ projectData: props.projectData }}>
                      <button className='add-member-button'> Add Members</button>
                  </Link>
              </div>
      ):(
        <></>
      )}
      
    </div>
  )
}
