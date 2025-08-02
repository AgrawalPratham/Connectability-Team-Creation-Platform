import React from "react";
import "./dashboard.css";
import { useEffect, useState } from 'react'
import Nav from "../../components/Nav"
import CreateProjectButton from "./dashboard_components/projectcontainer/projectcontainer";
import Topcontributor from "./dashboard_components/topcontributors/topcontributor";
import Needhelp from "../../components/needhelp";
import Card from "./dashboard_components/cards/Card";
import Cardy from "./dashboard_components/cards/card2";

const Dashboard = () => {
    const [userProjects, setUserProjects] = useState(null)

    const fetchUserProjects = () =>{
        fetch("http://34.143.192.157:8080/allUserProjects", {
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok: " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                setUserProjects(data);
                console.log(userProjects);
            })
            .catch((error) => {
                console.log("Error on client side extracting user projects data : ", error)
            });
}

    useEffect(() => {
        fetchUserProjects();
    }, []);

    useEffect(() => {
        console.log("User projects data : ", userProjects)
    }, [userProjects])

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
                
                

                    <div className="projects">
                        <CreateProjectButton userProjects={userProjects} />
                        
                    </div>
                
                
                <div className="contributors-section">
                    <Topcontributor />
                </div>
            </div>
            
            <div className="help-section">
                {/* <Needhelp /> */}
            </div>
        </div>
    );
};

export default Dashboard;
