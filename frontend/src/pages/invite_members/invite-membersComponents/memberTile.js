import React from 'react'
import './memberTile.css'

import linkedin from '../../../images/LinkedIn.png'
import github from '../../../images/GitHub.png'
import resume from '../../../images/Resume.png'
import addUser from '../../../images/AddUser.png'

export default function memberTile(props) {
  const payload ={
    project_id: props.project_id,
    receiver_email: props.eligibleUser.email
  }

  const handleInvite = () =>{
    fetch("http://34.143.192.157:8080/inviteUserForProject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          return response.text().then((text) => {
            throw new Error(`Error: ${response.status} - ${text}`);
          });
        }
      })
      .then((message) => {
        console.log("User invited successfully:", message);
        props.refreshUsers()
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      })
  }

  return (
      <div className='individual-member-tile'>
          <div className='individual-member-image'>
              <img src={props.eligibleUser?.image}></img>
          </div>
          <div className='individual-member-details'>
              <h3>{props.eligibleUser?.name}</h3>
              <div className='member-skill-list'>
                {props.eligibleUser?.skills.map((skill, index) =>(
                  <div className='member-skill'>{skill}</div>
                ))}

              </div>
              <div className='member-links'>
                    <a
                      className='member-link'
                      href={
                        props.eligibleUser.linkedin_id.startsWith('https://')
                          ? props.eligibleUser.linkedin_id
                          : `https://${props.eligibleUser.linkedin_id}`
                      }
                    >
                      <img src={linkedin} alt="LinkedIn" />
                    </a>

                    <a
                      className='member-link'
                      href={
                        props.eligibleUser.github_id.startsWith('https://')
                          ? props.eligibleUser.github_id
                          : `https://${props.eligibleUser.github_id}`
                      }
                    >
                      <img src={github} alt="GitHub" />
                    </a>

                    <a
                      className='member-link'
                      href={
                        props.eligibleUser.resume.startsWith('https://')
                          ? props.eligibleUser.resume
                          : `https://${props.eligibleUser.resume}`
                      }
                    >
                      <img src={resume} alt="Resume" />
                    </a>

                <button className='invite-member-button' onClick={handleInvite}><img src={addUser}></img></button>
              </div>
          </div>
      </div>
  )
}
