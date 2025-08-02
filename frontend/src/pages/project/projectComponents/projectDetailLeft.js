import React from 'react'
import './projectDetailLeft.css'
import github from '../../../images/GitHubBlack.png'
import whatsapp from '../../../images/whatsapp.png'

export default function projectDetailLeft(props) {

  return (
      <div className='project-content'>
            <div className='project-content-heading1'>
                <h3>Description</h3>
            </div>
            
            <div className='project-description'>
              <p>{props.projectData.project_description}</p>
            </div>
          <a href={
            props.projectData.chat_link.startsWith('https://')
              ? props.projectData.github_link
              : `https://${props.projectData.github_link}`
          } target="_blank" rel="noopener noreferrer">
                <div className='project-content-heading2'>
                    <h3>Project Git</h3>
                    <img src={github}></img>
                </div>
            </a>
          <a href={
            props.projectData.chat_link.startsWith('https://')
              ? props.projectData.chat_link
              : `https://${props.projectData.chat_link}`
          } target="_blank" rel="noopener noreferrer">
              <div className='project-content-heading2'>
                  <h3>Chat</h3>
                  <img src={whatsapp}></img>
              </div>
          </a>
            <div className='project-image'>
              {props.projectData.images && props.projectData.images.length > 0 ? (
          <img src={props.projectData.images[props.projectData.images.length - 1]} alt="Project" />
              ) : (
                <p>No image available</p> // Fallback text or content when images are null or empty
              )}
            </div>
        </div>
  )
}
