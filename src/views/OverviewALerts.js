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
import AlertsComponent from "../components/dashboard/AlertComponent";
import AlertLog from "../components/dashboard/AlertLog";

export default function OverviewAlerts() {
    
 
  return (
    <div>
       <h4>Alerts summary</h4>
      {/***Top Cards***/}
     
      <Row>
      
      <Col sm="6" lg="6" xl="2" xxl="12">
          <AlertLog/>
       
        </Col>
       
        
       
       
       
      
       
       
        </Row>
       
     
    </div>
  );
}
