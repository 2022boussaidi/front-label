import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Queues from "../components/dashboard/Queues";

export default function OverviewRobots() {
 
  return (
    <div>
       <h4>Workers </h4>
      {/***Top Cards***/}
     
      <Row>
      
      
        <Col sm="6" lg="6" xl="6" xxl="12">
          <Queues/>
        </Col>
        
        </Row>
       
     
    </div>
  );
}
