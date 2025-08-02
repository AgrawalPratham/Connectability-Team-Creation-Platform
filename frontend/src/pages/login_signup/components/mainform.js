import React, { useState } from 'react';
import './mainform.css';
import { useNavigate } from 'react-router-dom'
import { AuthData } from '../../../Auth/AuthWrapper';
import Swal from 'sweetalert2';

const Mainform = () => {
  const Swal = require('sweetalert2')
  const { login } = AuthData();
  const [errorMessage, setErrorMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isRightPanelActive, setRightPanelActive] = useState(false);
  const [skills, setSkills] = useState(['']);

  const handleSkillChange = (index, event) => {
    const newSkills = [...skills];
    newSkills[index] = event.target.value;
    setSkills(newSkills);
  };

  const addSkillField = () => {
    setSkills([...skills, '']);
  };

  const removeSkillField = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };


  const updateFormStep = (step) => {
    setCurrentStep(step);
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSignUp = () => setRightPanelActive(true);
  const handleSignIn = () => setRightPanelActive(false);

  
  //Function to handle the User Sign up
  function handleSubmit(event) {
    event.preventDefault();
    const signupData = {};
    const formElements = event.target.elements;

    for (let i = 0; i < formElements.length; i++) {
      const input = formElements[i];
      if (input.name) {
        // If the name is "skills[]", collect all the skills as an array
        if (input.name === 'skills[]') {
          if (!signupData.skills) {
            signupData.skills = [];
          }
          signupData.skills.push(input.value);
        } else {
          signupData[input.name] = input.value;
        }
      }
    }

    console.log("Sign up form data");
    console.log(signupData);

    fetch("http://34.143.192.157:8080/registerUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(signupData),
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
          text: "Sign up successful",
          icon: "success",
          showConfirmationButton: false,
          timer: 3500
        });
        console.log("Sign up successful:", message);
        login()
        navigate("/")
        window.location.reload(); 
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          title: "Oops!",
          text: "Sign Up unsuccessful",
          icon: "error",
          showConfirmationButton: false,
          timer: 3500
        });
        console.log("Fetch error:", error);
        setErrorMessage("Sign Up was unsuccessful.Please try again");
        navigate("/")
      })
  }



  const navigate = useNavigate()

  //Function to handle the User Sign in
  function handleSignin(event) {
    event.preventDefault()
    const signinData = {}
    const formElements = event.target.elements
    for (let i = 0; i < formElements.length; i++) {
      const input = formElements[i]
      if (input.name) {
        signinData[input.name] = input.value
      }
    }
    console.log("Sign in form data")
    console.log(signinData)

    fetch("http://34.143.192.157:8080/loginUser", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify(signinData),
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
        console.log("Sign in successful:", message);
        login(signinData.email)
        navigate("/dashboard")
      })
      .catch((error) => {
        console.log("Fetch error:", error);
        setErrorMessage("Invalid credentials. Please try again."); 
        navigate("/")
      })

  }

  return (
    <>
    <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">

      <div className="form-container sign-up-container">
          <form action="http://34.143.192.157:8080/registerUser" method='POST' onSubmit={handleSubmit} id="loginsignup">
          <div className={`form-step ${currentStep === 0 ? 'active' : ''}`}>
            <h1>Create Account</h1>
            <span>Enter your details to move forward</span>
            <input type="text" placeholder="Name" name='name'required />
            <input type="email" placeholder="Email" name='email' required />
            <input type="password" placeholder="Password" name='password' required />
            <div className="form-navigation">
              <button type="button" className="next-btn" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>

          <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
            <h1>Additional Details</h1>
              <input type="number" placeholder="Phone Number" name='phone' required />
              <input type="text" placeholder="City" name='city' required />
              <input type="text" placeholder="State" name='state' required />
              <input type="text" placeholder="Country" name='country' required />
              <textarea placeholder="Tell us about yourself" name='about' required></textarea>
            <div className="form-navigation">
              <button type="button" className="back-btn" onClick={handleBack}>
                Back
              </button>
              <button type="button" className="next-btn" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>

          <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
            <h1>Social & Professional Links</h1>
              <input type="text" placeholder="GitHub Link" name='github_id' required />
              <input type="text" placeholder="LinkedIn Profile" name='linkedin_id' required />
              <input type="text" placeholder="Resume Link" name='resume' required />
            <div className="form-navigation">
              <button type="button" className="back-btn" onClick={handleBack}>
                Back
              </button>
              <button type="button" className="next-btn" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>

          <div className={`skills-area form-step ${currentStep === 3 ? 'active' : ''}`}>
            <h1>Professional Experience</h1>
              <textarea placeholder="Past Experiences" name='experience' required></textarea>
              {/* <input type="text" placeholder="Profile Image Link" name='image' required /> */}


            {/* <input type="text" placeholder="Skills" /> */}

              <label>Skills</label>
              {skills.map((skill, index) => (
                <div key={index} className="skill-input">
                  <input
                    type="text"
                    value={skill}
                    onChange={(event) => handleSkillChange(index, event)}
                    name="skills[]" // Set name as "skills[]"
                    placeholder="Enter a skill" required
                  />
                  <button
                    type="button" className='skill-remove-button'
                    onClick={() => removeSkillField(index)}
                    disabled={skills.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className='skill-add-button' onClick={addSkillField}>
                Add another skill
              </button>



            <div className="form-navigation">
              <button type="button" className="back-btn" onClick={handleBack}>
                Back
              </button>
              <button type="submit">Submit</button>
            </div>
          </div>
          </form>
      </div>

      <div className="form-container sign-in-container">
        <form action="http://34.143.192.157:8080/loginUser" method='POST' onSubmit={handleSignin}>
          <h1>Sign in</h1>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button type="submit" >Sign In</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={handleSignIn}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>

      {errorMessage && <p style={{ color: "red", fontSize: "2rem" }}>{errorMessage}</p>}
    </>

  );
};

export default Mainform;

