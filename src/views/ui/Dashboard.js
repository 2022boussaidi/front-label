import React, { useEffect, useState } from "react";
import axios from "axios";
import TopCards from "./TopCards";
import { Row, Col } from "reactstrap";
import Inventory from "../../components/dashboard/Inventory";
import AlertComponent from "../../components/dashboard/AlertComponent";

const Buttons = () => {
  const [kpi, setKpi] = useState(null);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const bearerToken = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/inventory",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      setKpi(response.data.kpi);
    } catch (error) {
      console.error("Error loading inventory:", error);
    }
  };

  return (
    <div>
      <div
        className="text-right mt-2"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2>Inventory</h2>
      </div>

      {kpi && (
        <Row>
          <Col sm="4" lg="4">
            <TopCards
              bg="bg-light-warning text-warning"
              title="New Project"
              subtitle="Total sites"
              earning={kpi.site.value}
              icon="bi bi-robot"
              details={[
                `Scenarios: ${kpi.site.detail.scenarios}`,
                `Deployment Areas: ${kpi.site.detail.deployment_areas}`,
              ]}
            />
          </Col>
          <Col sm="4" lg="4">
            <TopCards
              bg="bg-light-info text-info"
              title="Sales"
              subtitle="Total robots"
              earning={kpi.robot.value}
              icon="bi bi-robot"
              details={[
                `Running: ${kpi.robot.detail.running}`,
                `Delayed: ${kpi.robot.detail.delayed}`,
                `Stopped: ${kpi.robot.detail.stopped}`,
              ]}
            />
          </Col>
          <Col sm="4" lg="4">
            <TopCards
              bg="bg-light-success text-success"
              title="New Project"
              subtitle="Total workers"
              earning={kpi.worker.value}
              icon="bi bi-robot"
              details={[
                `Running: ${kpi.worker.detail.running}`,
                `Delayed: ${kpi.worker.detail.delayed}`,
                `Stopped: ${kpi.worker.detail.stopped}`,
              ]}
            />
          </Col>
        </Row>
      )}

      <Row>
        <Col sm="12" lg="12">
          <Inventory />
        </Col>
      
      </Row>
    </div>
  );
};

export default Buttons;
