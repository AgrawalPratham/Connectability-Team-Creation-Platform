import React, { useState, useRef } from 'react';
import './createProject.css';
import { useNavigate } from 'react-router-dom'
import Nav from '../../components/Nav';
import launch from '../../images/launch.png';
import fire from '../../images/fire.png'
import announcement from '../../images/announcement.png'
import Swal from 'sweetalert2';

export default function CreateProject() {
  const Swal = require('sweetalert2')
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [imageLinks, setImageLinks] = useState(['']); // Initial state with one empty link
  const allSkills = ['Java','C++','Python','C','Reacr JS', 'Go','Flask','Node JS', 'Machine Learning','Django','Linux','c#','Unity','HTML','CSS','Bootstrap','Figma'];

  const [errorMessage, setErrorMessage] = useState("");

  // Allow dropping in both skill containers
  const allowDrop = (event) => {
    event.preventDefault();
  };

  // Handle dragging of items
  const handleDragStart = (event, skill, fromSelectedSkills) => {
    event.dataTransfer.setData("text", skill);
    event.dataTransfer.setData("fromSelectedSkills", fromSelectedSkills);
  };

  // Handle dropping of items
  const handleDrop = (event, toSelectedSkills) => {
    event.preventDefault();
    const skill = event.dataTransfer.getData("text");
    const fromSelectedSkills = event.dataTransfer.getData("fromSelectedSkills") === 'true';

    if (toSelectedSkills && !selectedSkills.includes(skill)) {
      setSelectedSkills((prevSkills) => [...prevSkills, skill]);
    } else if (!toSelectedSkills && selectedSkills.includes(skill)) {
      setSelectedSkills((prevSkills) => prevSkills.filter(s => s !== skill));
    }
  };

  // Handle image link changes
  const handleImageLinkChange = (index, event) => {
    const newImageLinks = [...imageLinks];
    newImageLinks[index] = event.target.value;
    setImageLinks(newImageLinks);
  };

  // Add a new image link field
  const addImageLinkField = () => {
    setImageLinks([...imageLinks, '']);
  };

  // Remove an image link field
  const removeImageLinkField = (index) => {
    const newImageLinks = imageLinks.filter((_, i) => i !== index);
    setImageLinks(newImageLinks);
  };


  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault();

    if (selectedSkills.length === 0) {
      // Show an error message if no skills are selected
      setErrorMessage("Please select at least one skill before submitting.");
      return; // Prevent form submission
    }

    // Clear the error message if validation passes
    setErrorMessage("");

    const createProjectData = {
      skills: selectedSkills, // Directly use the state for skills
    };
    const formElements = event.target.elements;

    for (let i = 0; i < formElements.length; i++) {
      const input = formElements[i];
      if (input.name && input.name !== 'skills[]' && input.name !== 'images[]') 
      {
        if (input.name === 'budget') 
        {
          createProjectData[input.name] = Number(input.value);
        } 
        else 
        {
          createProjectData[input.name] = input.value;
        }
      }
    }

    console.log("Create Project form data");
    console.log(createProjectData);

    fetch("http://34.143.192.157:8080/createProject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(createProjectData),
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
          title: "Great!",
          text: "Project Created Successfully",
          icon: "success",
          showConfirmationButton: false,
          timer: 3500
        });
        console.log("Project created successful:", message);
        navigate("/dashboard")
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          title: "Oops!!",
          text: "Project Creation failed",
          icon: "error",
          showConfirmationButton: false,
          timer: 3500
        });
        console.log("Fetch error:", error);
        setErrorMessage("Project creation unsuccessful. Please try again");
        // navigate("/")
      })
  }

  return (
    <div className="create-project-page">
      <div className="create-project-left">
        <Nav />
      </div>
      <div className="create-project-right">
        <div className="create-project-top">
          <div className="top-link-area">
            <a href="#" className="top-link">
              <p>Trending</p>
              <div className="top-link-image">
                <img  className='top-link-image'  src={fire} alt="Fire icon" />
              </div>
            </a>
            <a href="#" className="top-link">
              <p>Announcements</p>
              <div className="top-link-image">
                <img className='top-link-image'  src={announcement} alt="Launch icon" />
              </div>
            </a>
            <a href="#" className="top-link">
              <p>Hi Jignesh</p>
              <div className="top-link-image">
                <img className='top-link-image'  src={launch} alt="Launch icon" />
              </div>
            </a>
          </div>
          <p style={{ color: "red", fontSize: "2rem" }}>{errorMessage}</p>
        </div>

        <div className="create-project-main">
          <div className="create-project-heading">
            <h3>Create Your Project</h3>
          </div>

          <div className="create-project-form">
            <form onSubmit={handleSubmit} className="create-project-form">
              <div className='form-input-area'>
                <div className='input-area-left'>
                  <label htmlFor="name">Project Name</label>
                  <input type="text" id="name" name="project_name" placeholder="Your project name" required/>

                  <label htmlFor="description">Description</label>
                  <textarea id="description" name="project_description" placeholder="Describe your project" required></textarea>

                  <label htmlFor="github">Github Link</label>
                  <input type="text" id="github" name="github_link" placeholder="https://github.com/username/repo" required />

                
                  <label htmlFor="start-date">Start Date</label>
                  <input type="date" id="start-date" name="start_date" required />

                  <label htmlFor="budget">Budget</label>
                  <input type="number" id="budget" name="budget" placeholder="Enter Budget..." required />

                  <label htmlFor="deadline">Deadline</label>
                  <input type="date" id="deadline" name="end_date" required />

                  <label htmlFor="chatlink">Chat Link</label>
                  <input type="text" id="chatlink" name="chat_link" placeholder="WhatsApp link" required />
                </div>

                <div className='input-area-right'>
                  <h3>Skill-Set Required</h3>
                  <div
                    id="skills-list"
                    className="skills-list"
                    onDrop={(event) => handleDrop(event, false)}
                    onDragOver={allowDrop}
                  >
                    {allSkills.filter(skill => !selectedSkills.includes(skill)).map(skill => (
                      <div
                        key={skill}
                        className="skill-item"
                        draggable="true"
                        onDragStart={(event) => handleDragStart(event, skill, false)}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>

                  <h3>Selected Skills</h3>
                  <div
                    id="selected-skills"
                    className="selected-skills"
                    onDrop={(event) => handleDrop(event, true)}
                    onDragOver={allowDrop}
                  >
                    {selectedSkills.map(skill => (
                      <div
                        key={skill}
                        className="skill-item"
                        draggable="true"
                        onDragStart={(event) => handleDragStart(event, skill, true)}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className='form-submit-button-area'>
                <button type="submit" className="publish-btn">Publish</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
