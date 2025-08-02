import React from 'react'
import { useEffect, useState } from 'react'
import './invitation.css'
import Nav from '../../components/Nav'
import NeedHelp from '../../components/needhelp.js'
import launch from '../../images/launchWhite.png'
import announcement from '../../images/announcementWhite.png'
import fire from '../../images/fireWhite.png'
import IndividualInvitation from './invitationComponent/individualInvitation.js';

export default function Invitation() {

  const [userInvitations, setUserInvitations] = useState(null);

  const fetchInvitations = () => {
    fetch("http://34.143.192.157:8080/userInvitations", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setUserInvitations(data);
      })
      .catch((error) => {
        console.log("Error on client side fetching user invitations: ", error);
      });
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  useEffect(() => {
    console.log("User invitations: ", userInvitations);
  }, [userInvitations]);



  return (
    <div className='invitation-page'>
         <div className='invitation-page-left'>
              <Nav />
              <NeedHelp />
        </div>
      {userInvitations? (<div className='invitation-page-right'>


        <div className='page-top-area'>
          <div className='top-link-area'>
            <a href='#' className='top-link'>
              <p>Trending</p>
              <div className='top-link-image'>
                <img src={fire}></img>
              </div>
            </a>
            <a href='#' className='top-link'>
              <p>Announcemenst</p>
              <div className='top-link-image'>
                <img src={announcement}></img>
              </div>
            </a>
            <a href='#' className='top-link'>
              <p>Hi {userInvitations.user_name}</p>
              <div className='top-link-image'>
                <img src={launch}></img>
              </div>
            </a>
          </div>
        </div>


        <div className='user-name-area'>
          <div className='user-image'>
            <img src={userInvitations.user_image} ></img>
          </div>
          <div className='user-details'>
            <h3>{userInvitations.user_name}</h3>
            <p id='user-email'>{userInvitations.user_email}</p>
          </div>
        </div>

        <div className='user-invitation-area'>
          <h3>Yay! You Got {userInvitations.invitation_count} Invitations</h3>
          <hr></hr>
          <div className='invitation-area-headings'>
            <p>PROJECTS</p>
            {/* <p>MEMBERS COUNT</p> */}
            <p id="budget-heading">BUDGET</p>
            <p>CONFIRMATION</p>
          </div>
          <hr className='horizontal-rule'></hr>
          {userInvitations.project_details == null ? (
            <p>No invitations yet</p>
          ) : (
            userInvitations.project_details.map((project, index) => (
              <IndividualInvitation
                key={index}
                project_id={project.project_id}
                project_name={project.project_name}
                project_budget={project.budget}
                refreshInvitations={fetchInvitations}
              />
            ))
          )}
          
          
        </div>
      </div>)
      : 
      (<p>Loading...</p>)}
        
      
    </div>
  )
}
