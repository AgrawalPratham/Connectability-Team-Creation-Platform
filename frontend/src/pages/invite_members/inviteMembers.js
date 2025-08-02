import React, { useState, useEffect } from 'react';
import './inviteMembers.css';
import Nav from '../../components/Nav';
import launch from '../../images/launch.png';
import fire from '../../images/fire.png'
import announcement from '../../images/announcement.png'

import MemberTile from './invite-membersComponents/memberTile.js'
import { useLocation } from 'react-router-dom';


export default function InviteMembers() {
    const location = useLocation();
    const { projectData } = location.state || {};
    console.log(projectData)

    const [eligibleUsers, setEligibleUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    const temp = {
        project_id: projectData.project_id,
        skills: projectData.skills
    }
    console.log(temp)

    const fetchUsers = () =>{
        fetch("http://34.143.192.157:8080/eligibleMembersForProject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(temp),
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
                setEligibleUsers(data);
                setIsLoading(false); // Set loading to false once data is fetched
            })
            .catch((error) => {
                console.log("Error on client side extracting eligible members data: ", error);
                setIsLoading(false); // Also set loading to false if there's an error
            });
    };

    useEffect(() => {
        if (projectData) { // Check if projectData is present
            fetchUsers()
        }
    }, [projectData]); // Add dependency to ensure `useEffect` runs when `props.projectData` changes

    // Ensure data is loaded before rendering
    if (isLoading || !projectData) {
        return <div>Loading...</div>; // Show loading indicator
    }

    console.log(eligibleUsers)
    
    return (
        <div className="invite-members-page">
            <div className="invite-members-left">
                <Nav />
            </div>
            <div className="invite-members-right">
                <div className="invite-members-top">
                    <div className="top-link-area">
                        <a href="#" className="top-link">
                            <p>Trending</p>
                            <div className="top-link-image">
                                <img className='top-link-image' src={fire} alt="Fire icon" />
                            </div>
                        </a>
                        <a href="#" className="top-link">
                            <p>Announcements</p>
                            <div className="top-link-image">
                                <img className='top-link-image' src={announcement} alt="Launch icon" />
                            </div>
                        </a>
                        {/* <a href="#" className="top-link">
                            <p>Hi Jignesh</p>
                            <div className="top-link-image">
                                <img className='top-link-image' src={launch} alt="Launch icon" />
                            </div>
                        </a> */}
                    </div>
                </div>

                <div className='invite-members-main'>
                    <div className='invite-members-heading-area'>
                        <h2 className='invite-members-heading1'>{projectData.project_name}</h2>
                        <h3 className='invite-members-heading2'>Build Your Team</h3>
                    </div>
                    <div className='invite-members-tiles'>
                        {eligibleUsers!=null?(
                                eligibleUsers.map((eligibleUser, index) => (
                                    <MemberTile 
                                    eligibleUser={eligibleUser} 
                                    project_id={projectData.project_id}
                                    refreshUsers = {fetchUsers}
                                    />
                                ))
                        ):(
                            <p style={{fontSize:"1.5rem", color:"grey"}}>No eligible user with requires skill yet.</p>
                        )}
                        
                    </div>
                </div>

            </div>
        </div>
    );
}
