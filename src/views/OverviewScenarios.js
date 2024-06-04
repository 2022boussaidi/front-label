import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Robots from "../components/dashboard/Robots";
import Tables from "./ui/Tables";
import Scenarios from "../components/dashboard/Scenarios";
import ScenarioEfficinecy from "../components/dashboard/ScenarioEfficiency";
import StatusScenario from "../components/dashboard/StatusScenario";


export default function OverviewSceanrios() {
    
 
  return (
    <div>
     
      <h4>Scenarios</h4>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="6" xl="6" xxl="12">
          <Scenarios/>
        </Col>
        <Col sm="6" lg="6" xl="2" xxl="6">
          <ScenarioEfficinecy />
        </Col>
        <Col sm="6" lg="6" xl="2" xxl="6">
          <StatusScenario />
        </Col>
      </Row>
    </div>
  );
}
