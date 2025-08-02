import React from "react";
import "./dashboard.css";
import Nav from "../../components/Nav.js";
import CreateProjectButton from "./dashboard_components/projectcontainer/projectcontainer";
import Topcontributor from "./dashboard_components/topcontributors/topcontributor";
import Needhelp from "../../components/needhelp";
import Card from "./dashboard_components/cards/Card";
import Cardy from "./dashboard_components/cards/card2";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="sidebar">
                <Nav />
            </div>
            
            <div className="main-content">

                <div className="cards">
                    <Card/>
                    <Cardy/>
                </div>
                
                <div className="projects-section">

                    <div className="projects">
                        <CreateProjectButton />
                        {/* Add other project cards as separate components */}
                    </div>
                </div>
                
                <div className="contributors-section">
                    <Topcontributor />
                </div>
            </div>
            
            <div className="help-section">
                <Needhelp />
            </div>
        </div>
    );
};

export default Dashboard;
