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
import ErrorLineChart from "../components/dashboard/ErrorLineChart";
import PredictionTable from "../components/dashboard/PredictionTable";
import AlertError from "../components/dashboard/AlertError";

export default function OverviewErrors() {
    
 
  return (
    <div>
       <h4>Errors Summary</h4>
      {/***Top Cards***/}
     
      <Row>
      
      
      
        <Col sm="6" lg="6" xl="2" xxl="12">
          <Error/>
        </Col>
         
        <Col sm="6" lg="6" xl="2" xxl="6">
          <ErrorLineChart/>
        </Col>
        <Col sm="6" lg="6" xl="2" xxl="6">
          <PredictionTable/>
        </Col>
       
        
       
       
        </Row>
       
     
    </div>
  );
}
