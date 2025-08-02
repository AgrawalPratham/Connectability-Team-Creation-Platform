import React from 'react';
import './needhelp.css';
import questionmark from '../images/questionmark.png'
import needhelppdf from '../pdf/UCS510-1.pdf'

const App = () => {
  const handleDocumentationClick = () => {
    window.open(needhelppdf, '_blank');
  };

  return (
    <div className="box">
      <svg
        className="concentric-circles"
        preserveAspectRatio="none"
        viewBox="0 0 220 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="218" height="169.5" rx="15" fill="#4FD1C5" />
        <mask id="mask0" style={{ maskType: 'alpha' }} x="0" y="0" width="218" height="170">
          <rect width="218" height="169.5" rx="15" fill="#4FD1C5" />
        </mask>
        <g mask="url(#mask0)" opacity="0.2">
          <circle cx="220" cy="170" r="177.75" stroke="white" />
          <circle cx="220" cy="170" r="153.72" stroke="white" />
          <circle cx="220" cy="170" r="126.37" stroke="white" />
          <circle cx="220" cy="170" r="99.025" stroke="white" />
          <circle cx="220" cy="170" r="72.51" stroke="white" />
          <circle cx="220" cy="170" r="48.475" stroke="white" />
          <circle cx="220" cy="170" r="29.25" stroke="white" />
        </g>
      </svg>

      <div className="content">
        <div className="whitebox">
          <img src={questionmark} alt="questionmark" />
        </div>
        <div className="text-content">
          <div className="heading">Need help?</div>
          <div className="text">Please check our docs</div>
        </div>
        <button className="btn" onClick={handleDocumentationClick}>
          DOCUMENTATION
        </button>
      </div>
    </div>
  );
};

export default App;
