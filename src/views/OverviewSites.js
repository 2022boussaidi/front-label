import { Col, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "./ui/TopCards";
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import TeamManagement from "../components/dashboard/TeamManagment";


import { Link } from "react-router-dom";
import Sites from "../components/dashboard/Sites";
import SearchBar from "../components/dashboard/SearchBar";
import DataGridDemo from "../components/dashboard/DataGridDemo";

const OverviewSites = () => {
  

  
 

 

  return (
    <div>
       <h4>Sites</h4>
      {/***Top Cards***/}
     
      <Row>
      
      
        <Col sm="6" lg="6" xl="6" xxl="12">
          <Sites/>
        </Col>
        
        
        </Row>
       
     
    </div>
  );
};

export default OverviewSites;
