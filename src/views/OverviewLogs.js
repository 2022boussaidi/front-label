import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Robots from "../components/dashboard/Robots";
import Tables from "./ui/Tables";
import Scenarios from "../components/dashboard/Scenarios";
import ScenarioEfficinecy from "../components/dashboard/ScenarioEfficiency";
import StatusScenario from "../components/dashboard/StatusScenario";
import CPUutilization from "../components/dashboard/CPUutilization";
import NetworkIn from "../components/dashboard/NetworkIn";
import NetworkOut from "../components/dashboard/NetworkOut";
import DataConsumption from "../components/consumption/ApiConsumption";
import Error from "../components/dashboard/Error";
import LogLevelPieChart from "../components/dashboard/LogLevelPieChart";
import Logs from "../components/dashboard/Logs";
import TotalLog from "../components/dashboard/TotalLog";
import ActionByRobot from "../components/dashboard/ActionByRobot";

export default function OverviewLogs() {
    
 
  return (
    <div>
       <h4>Events</h4>
      {/***Top Cards***/}
     
      <Row>
      
      
      <Col sm="6" lg="6" xl="2" xxl="12">
          <Logs/>
        </Col>
        <Col sm="8" lg="8" xl="2" xxl="12">
          <TotalLog/>
        </Col>
        <Col sm="6" lg="6" xl="2" xxl="4">
          <LogLevelPieChart/>
        </Col>
        <Col sm="6" lg="6" xl="2" xxl="8">
          <ActionByRobot/>
        </Col>
        
       
       
        </Row>
       
     
    </div>
  );
}
