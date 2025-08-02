import React, { useState, useRef } from 'react';
import './project.css';
import { useLocation } from 'react-router-dom';
import Nav from '../../components/Nav';
import launch from '../../images/launch.png';
import fire from '../../images/fire.png'
import announcement from '../../images/announcement.png'
import { AuthData } from '../../Auth/AuthWrapper.js';
import Swal from 'sweetalert2'

import ProjectDetailLeft from './projectComponents/projectDetailLeft.js'
import ProjectDetailRight from './projectComponents/projectDetailRight.js'

export default function CreateProject() {
    const Swal = require('sweetalert2')
    const{user} =AuthData();
    const location = useLocation();
    const { projectData} = location.state || {};

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

    function handleSubmit(event) {
        event.preventDefault();

        if (!selectedImage) {
            Swal.fire({
                position: "top-end",
                title: "Wait!",
                text: "Please select a picture to upload",
                icon: "error",
                showConfirmationButton: true
            });
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        formData.append('project_id', projectData.project_id);

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        fetch("http://34.143.192.157:8080/updateProjectPic", {
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
                    text: "Project picture uploaded",
                    icon: "success",
                    showConfirmationButton: false,
                    timer: 3500
                });
                console.log("Image uploaded successfully:", message);
            })
            .catch((error) => {
                Swal.fire({
                    position: "top-end",
                    title: "Failed",
                    text: "Project picture not uploaded",
                    icon: "error",
                    showConfirmationButton: false,
                    timer: 3500
                });
                console.log("Image not uploaded.Fetch error:", error);
            })

        setShowForm(false)
    }

    console.log("Project all details")
    console.log(projectData)

    console.log("current user is : ", user.user_email)

    return (
        <div className="project-page">
            <div className="project-left">
                <Nav />
            </div>
            <div className="project-right">
                <div className="project-top">
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

                <div className='project-main'>
                    <div className='project-heading-area'>
                        <h2 className='project-heading'>{projectData.project_name}</h2>
                        {user.user_email === projectData.manager_email ? (
                            <div className='upload_image'>
                                <button className='upload-image-button' onClick={handleButtonClick}>
                                    Upload Image
                                </button>

                                {showForm && (

                                    <div className='image-form'>
                                        {/* <div className='modal-content'> */}
                                        <h3>Upload Project Image</h3>
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
                        ) :(
                            <></>
                        )}
                        
                   
                    </div>

                    <div className='project-detail-area'>
                        <div className='project-detail-left'>
                            <ProjectDetailLeft projectData={projectData} />
                        </div>
                        <div className='project-detail-right'>
                            <ProjectDetailRight projectData={projectData} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
