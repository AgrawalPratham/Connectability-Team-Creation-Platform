import React from 'react'
import './individualInvitation.css'
import { Link } from "react-router-dom";

export default function IndividualInvitation(props) {

    const payload ={
        project_id : props.project_id
    };

    function handleAccept(){
        fetch("http://34.143.192.157:8080/acceptInvite", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload)
        }).then((response) => {
            if (response.ok) {
                console.log("Invitation accepted successfully")
                props.refreshInvitations()
            }
            else {
                console.log("Invitation not accepted successfully")
            }
        }).catch((error) => {
            console.log("Fetched error : ", error)
        })
    }

    function handleReject() {
        fetch("http://34.143.192.157:8080/rejectInvite", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload)
        }).then((response) => {
            if (response.ok) {
                console.log("Invitation rejected successfully")
                props.refreshInvitations()
            }
            else {
                console.log("Invitation not rejected successfully")
            }
        }).catch((error) => {
            console.log("Fetched error : ", error)
        })
    }

  return (
    <>
    <div className='user-individual-invitation'>
        {/* <Link to="/">  */}
        <p className='user-invitation-project'>{props.project_name}</p>
        {/* </Link> */}
            {/* <p>4</p> */}
        <p>{props.project_budget}</p>
        <div className='confirmation-button-area'>
            <button id='accept-button' onClick={handleAccept}>Accept</button>
            <button id='reject-button' onClick={handleReject}>Reject</button>
        </div>
    </div>
    <hr className='horizontal-rule'></hr>
      </>
  )
}
