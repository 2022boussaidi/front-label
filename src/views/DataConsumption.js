import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { ListGroup, ListGroupItem } from "reactstrap";
import ApiConsumption from "../components/consumption/ApiConsumption";
import DesktopConsumption from "../components/consumption/DesktopConsumption";
import BrowserConsumption from "../components/consumption/BrowserConsumption";
import HttpConsumption from "../components/consumption/HttpConsumption";
import AndroidConsumption from "../components/consumption/AndroidConsumption";
import IphoneConsumption from "../components/consumption/IphoneConsumption";
import WebConsumption from "../components/consumption/WebConsumption";



const DataConsumption = () => {
  
  

  return (
   
    <div>
    <h4>Data Consumption</h4>
   {/***Top Cards***/}
  
   <Row>
   
   
     
     <Col sm="6" lg="6" xl="2" xxl="4">
       <ApiConsumption />
     </Col>
     <Col sm="6" lg="6" xl="2" xxl="4">
       <DesktopConsumption />
     </Col>
     <Col sm="6" lg="6" xl="2" xxl="4">
       <BrowserConsumption />
      
     </Col>
     <Col sm="6" lg="6" xl="2" xxl="4">
       <HttpConsumption />
      
     </Col>
     <Col sm="6" lg="6" xl="2" xxl="4">
       <IphoneConsumption />
    
     </Col>
     <Col sm="6" lg="6" xl="2" xxl="4">
       <AndroidConsumption />
    
     </Col>
     <Col sm="6" lg="6" xl="2" xxl="5">
       <WebConsumption/>
    
     </Col>
    
     </Row>
    
  
 </div>
  
  );
};

export default DataConsumption;
