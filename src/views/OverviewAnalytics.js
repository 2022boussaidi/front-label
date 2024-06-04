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
import CreditUsage from "../components/dashboard/CreditUsage";

export default function OverviewAnalytics() {
    
 
  return (
    <div>
       <h4>Recources Analytics</h4>
      {/***Top Cards***/}
     
      <Row>
      
      
        
        <Col sm="6" lg="6" xl="2" xxl="6">
          <CPUutilization />
        </Col>
        <Col sm="6" lg="6" xl="2" xxl="6">
          <NetworkIn />
        </Col>
        <Col sm="6" lg="6" xl="2" xxl="6">
          <NetworkOut />
       
        </Col>
        <Col sm="6" lg="6" xl="2" xxl="6">
          <CreditUsage/>
       
        </Col>
       
       
        </Row>
       
     
    </div>
  );
}
