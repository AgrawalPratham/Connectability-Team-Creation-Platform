import React from 'react'
import { useEffect, useState } from 'react'
import './profile.css'
import Nav from '../../components/Nav'
import NeedHelp from '../../components/needhelp.js'
import launch from '../../images/launchWhite.png'
import announcement from '../../images/announcementWhite.png'
import fire from '../../images/fireWhite.png'

import linkedin from '../../images/linkedin-removebg-preview.png'
import github from '../../images/github-removebg-preview.png'
import resume from '../../images/resume-removebg-preview.png'
import Swal from 'sweetalert2'




export default function ProfilePage() {

    const Swal = require('sweetalert2')

    const [userData, setUserData] = useState(null)
    const [showForm, setShowForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleButtonClick = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleFileChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    function handleSubmit(event){
        event.preventDefault();

        if (!selectedImage) {
            Swal.fire({
                title: "No Image Selected",
                text: "Please select an image to upload",
                icon: "error"
            });
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage); 

        console.log(formData)

        fetch("http://34.143.192.157:8080/updateUserPic", {
            method: "POST",
            // headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: formData,
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
                Swal.fire({
                    position: "top-end",
                    title: "Wonderful!",
                    text: "Profile picture uploaded",
                    icon: "success",
                    showConfirmationButton: false,
                    timer: 3500
                });
                console.log("Image uploaded successfully:", message);
                fetchUserProfile()
            })
            .catch((error) => {
                Swal.fire({
                    position: "top-end",
                    title: "Failed",
                    text: "Profile picture not uploaded",
                    icon: "error",
                    showConfirmationButton: false,
                    timer: 3500
                });
                console.log("Image not uploaded.Fetch error:", error);
            })

        setShowForm(false)
    }

    const fetchUserProfile = () =>{
        fetch("http://34.143.192.157:8080/userProfile", {
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok: " + response.statusText);
                }
                console.log("1");
                console.log(response)
                return response.json();
            })
            .then((data) => {
                console.log("2");
                console.log(data)
                setUserData(data);
                console.log("3");
                console.log(userData);
            })
            .catch((error) => {
                console.log("Error on client side extracting user data : ", error)
            });
    }

    useEffect(() => {
       fetchUserProfile()
    }, [])

    useEffect(() => {
        console.log("User data : ", userData)
    }, [userData])


    // const getDirectImageLink = (driveUrl) => {
    //     const match = driveUrl.match(/d\/(.+?)\//);
    //     return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : driveUrl;
    // };




    return (
        <div className='invitation-page'>
            <div className='invitation-page-left'>
                <Nav />
                <NeedHelp />
            </div>
        
            {userData ? (
                <div className='invitation-page-right'>


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
                                <p>Hi {userData.name}</p>
                                <div className='top-link-image'>
                                    <img src={launch}></img>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className='user-name-area'>
                        <div className='user-image'>
                            <img src={userData.image}  />
                        </div>
                        <div className='user-details'>
                            <h3>{userData.name}</h3>
                            <p id='user-email'>{userData.email}</p>
                        </div>
                        <div className='upload_image'>
                            <button className='upload-image-button' onClick={handleButtonClick}>
                                Upload Image
                            </button>

                            {showForm && (
                                
                                    <div className='image-form'>
                                        {/* <div className='modal-content'> */}
                                            <h3>Upload Image</h3>
                                            <form onSubmit={handleSubmit}>
                                                <input
                                                    type='file'
                                                    accept='image/*'
                                                    onChange={handleFileChange}
                                                />
                                                <button className='image-submit-button' type='submit'>
                                                    Submit
                                                </button>
                                                <button type='button' onClick={handleCloseForm}>
                                                    Close
                                                </button>
                                            </form>
                                        {/* </div> */}
                                    </div>
                               
                            )}
                        </div>
                    </div>

                    <div className='user-detail-area'>
                        <div className='detail-area-left'>
                            <h2>Profile Information</h2>
                            <div className='user-profile-box'>

                                <p>{userData.about}</p>

                                <hr></hr>
                                <div className='user-personals'>
                                    <p><span id="user-personals-heading">Name :</span> {userData.name}</p>
                                    <p><span id="user-personals-heading">Mobile :</span> {userData.phone}</p>
                                    <p><span id="user-personals-heading">Email :</span> {userData.email}</p>
                                    <p><span id="user-personals-heading">Location :</span> {userData.country}</p>
                                    <p className='user-personal-links'>
                                        <span id="user-personals-heading">Links :</span>
                                        <div className='user-personal-links-inner'>
                                            <a
                                                className='user-individual-link'
                                                href={
                                                    userData.linkedin_id.startsWith('https://')
                                                        ? userData.linkedin_id
                                                        : `https://${userData.linkedin_id}`
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img src={linkedin} alt="LinkedIn" />
                                            </a>

                                            <a
                                                className='user-individual-link'
                                                href={
                                                    userData.github_id.startsWith('https://')
                                                        ? userData.github_id
                                                        : `https://${userData.github_id}`
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img src={github} alt="GitHub" />
                                            </a>

                                            <a
                                                className='user-individual-link'
                                                href={
                                                    userData.resume.startsWith('https://')
                                                        ? userData.resume
                                                        : `https://${userData.resume}`
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img src={resume} alt="Resume" />
                                            </a>


                                        </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='detail-area-right'>
                            <div className='detail-right-above'>
                                <h2>Skills</h2>
                                {userData.skills!=null?(
                                    <div className='user-skills'>
                                        {userData.skills.map((skill, index) => (
                                            <div key={index} className='user-individual-skill'>{skill}</div>
                                        ))}
                                    </div>
                                ) :(
                                    <p>No such skills</p>
                                )}
                                
                            </div>
                            <div className='detail-right-below'>
                                <h2>Experience</h2>
                                <p>{userData.experience}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ): 
            (<p>Loading...</p>) }
           

        </div>
    )
}