import React from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import TopCards from "./TopCards";
import SalesChart from "./SalesChart"
import  { useEffect, useState } from "react";
import axios from "axios";
import ProjectBar from "../../components/dashboard/ProjectBar";
import ProjectPerformanceChart from "../../components/dashboard/ProjectPerformanceChart";
import Grid from "./Grid";
import Badges from "./Badges";
import PieChart from "./PieChart";

const Breadcrumbs = () => {
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    const result = await axios.get("http://localhost:8080/teams");
    setTeams(result.data);
  };
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const result = await axios.get("http://localhost:8080/projects");
    setProjects(result.data);
  };
  return (
    <div>
       <h2>Report</h2>
      <Row>
        <Col sm="6" lg="31">
          
            <TopCards
              bg="bg-light-warning text-warning"
              title="New Project"
              subtitle="Total projects"
              earning={projects.length}
              icon="bi bi-basket3"
            >
              <div className="d-flex align-items-center justify-content-end">
            <Link className="btn btn-outline-primary mx-2" to="/addproject">
              Add Project
            </Link>
            </div>
            </TopCards>
         
          
        </Col>
        <Col sm="6" lg="31">
         
            <TopCards
              bg="bg-light-info text-info"
              title="Sales"
              subtitle="Team size"
              earning={teams.length}
              icon="bi bi-bag"
            >
               <div className="d-flex align-items-center justify-content-end">
            <Link className="btn btn-outline-primary mx-2" to="/addteam">
              Add Team
            </Link>
          </div>
          </TopCards>
        </Col>
      </Row>
      <Row>
     <Col sm="6" lg="6" xl="6" xxl="6">
       <SalesChart/>
     </Col>
     <Col sm="6" lg="6" xl="6" xxl="6">
       <PieChart/>
     </Col>
    
   </Row>
    </div>
     
  );
};

export default Breadcrumbs;
