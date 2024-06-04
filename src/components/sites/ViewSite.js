import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardTitle, Table, Row, Col } from 'reactstrap';

export default function ViewSite() {
  const [site, setSite] = useState({
    siteId: "",
    name: "",
    isPrivate: false,
    robotId: "",
    proxy: "",
    scenarioNb: 0,
    queueNb: 0,
    hasSiteManagerIssue: false,
    zoneNb: 0,
    clients: [],
  });

  const [openModal, setOpenModal] = useState(false);
  const [zones, setZones] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [availableSites, setAvailableSites] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadSite();
  }, []);

  const loadSite = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/callsite/${id}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`
        }
      });
      const siteData = response.data;
      setSite({
        siteId: siteData.siteId,
        name: siteData.name,
        isPrivate: siteData.isPrivate,
        robotId: siteData.robotId,
        proxy: siteData.proxy,
        scenarioNb: siteData.scenarioNb,
        queueNb: siteData.queueNb,
        hasSiteManagerIssue: siteData.hasSiteManagerIssue,
        zoneNb: siteData.zoneNb,
        clients: siteData.clients
      });
    } catch (error) {
      console.error("Error loading site:", error);
    }
  };

  const loadZonesAndScenarios = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/linked-elements/${id}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`
        }
      });
      const data = response.data;
      setZones(data.zones);
      setScenarios(data.scenarios);
    } catch (error) {
      console.error("Error loading zones and scenarios:", error);
    }
  };

  const loadAvailableSites = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/scripting', {
        headers: {
          Authorization: `Bearer ${bearerToken}`
        }
      });
      setAvailableSites(response.data);
    } catch (error) {
      console.error("Error loading available sites for scripting:", error);
    }
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
    if (!openModal) {
      loadZonesAndScenarios();
      loadAvailableSites();
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h2 className="text-center m-4">Site Details</h2>

        <div className="card">
          <div className="card-header">
            Details of site id : {site.siteId}
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Name:</b> {site.name}
              </li>
              <li className="list-group-item">
                <b>Privacy:</b> {site.isPrivate ? "Private" : "Public"}
              </li>
              <li className="list-group-item">
                <b>RobotId:</b> {site.robotId}
              </li>
              <li className="list-group-item">
                <b>Proxy:</b> {site.proxy || "None"}
              </li>
              <li className="list-group-item">
                <b>Scenario count:</b> {site.scenarioNb}
              </li>
              <li className="list-group-item">
                <b>Queue count:</b> {site.queueNb}
              </li>
              <li className="list-group-item">
                <b>Site manager issue:</b> {site.hasSiteManagerIssue ? "Yes" : "No"}
              </li>
              <li className="list-group-item">
                <b>Zone count:</b> {site.zoneNb}
              </li>
              <li className="list-group-item">
                <b>Clients:</b> {site.clients.join(", ")}
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <Link className="btn btn-primary my-2" to={"/sites"}>
            Back to Sites
          </Link>
          <Button onClick={toggleModal} className="btn btn-primary my-2">
            <FontAwesomeIcon icon={faAngleDoubleRight} /> More Details
          </Button>
        </div>
      </div>

      <Modal isOpen={openModal} toggle={toggleModal} size="xl">
        <ModalHeader toggle={toggleModal}>Linked Elements</ModalHeader>
        <ModalBody style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
          <div className="space-y-6">
            <Row>
              <Col sm="4" lg="4">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">Zones:</CardTitle>
                    <Table>
                      <thead>
                        <tr>
                          <th>Zone Name</th>
                          <th>Client Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {zones.map((zone, index) => (
                          <tr key={index}>
                            <td>{zone.zoneName}</td>
                            <td>{zone.clientName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="6" lg="8" xl="7" xxl="8">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">Available Sites for Scripting</CardTitle>
                    <Table>
                      <thead>
                        <tr>
                          <th>Site ID</th>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {availableSites.map((site, index) => (
                          <tr key={index}>
                            <td>{site.siteId}</td>
                            <td>{site.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
                {/***************site scenarios******************* */}

            <Col sm="6" lg="8" xl="7" xxl="12">
            <Card>
              <CardBody>
              <CardTitle tag="h5">Scenarios:</CardTitle>
    <Table>
      <thead>
        <tr>
        <th>Zone Id</th>
          <th>Scenario Name</th>
          <th>Client Name</th>
        </tr>
      </thead>
      <tbody>
        {scenarios.map((scenario, index) => (
          <tr key={index}>
             <td>{scenario.scenarioId}</td>
            <td>{scenario.scenarioName}</td>
            <td>{scenario.clientName}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </CardBody>
</Card>
</Col>
</Row>
{/***************site scenarios******************* */}

          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setOpenModal(false)}>OK</Button>
      
        </ModalFooter>
      </Modal>
    </div>
  );
}
