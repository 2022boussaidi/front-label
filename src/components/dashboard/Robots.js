import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClock, faExclamationCircle, faEye, faPlayCircle, faSpinner, faStopCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from 'react-paginate';

export default function Overview() {
  const [robots, setRobots] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [rebootRobotId, setRebootRobotId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    hbStatus: "",
    storageName: "",
    isPrivate: "",
    version: "",
    technologies: ""
  });
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10; // Number of items per page

  useEffect(() => {
    loadRobots();
  }, []);

  const loadRobots = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/callrobots",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setRobots(response.data.robots);
    } catch (error) {
      console.error("Error loading robots:", error);
    }
  };

  const handleRebootConfirmation = (robotId) => {
    setRebootRobotId(robotId);
    setModalOpen(true);
  };

  const handleReboot = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8080/reboot/${rebootRobotId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setSuccessModalOpen(true);
      setModalOpen(false);
    } catch (error) {
      console.error("Error rebooting robot:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredRobots = robots.filter(robot => {
    return (
      robot.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      String(robot.storageName).includes(filter.storageName) &&
      String(robot.hbStatus).includes(filter.hbStatus) &&
      String(robot.isPrivate).includes(filter.isPrivate) &&
      String(robot.version).includes(filter.version) &&
      String(robot.technologies).includes(filter.technologies)
    );
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * pageSize;
  const pageCount = Math.ceil(filteredRobots.length / pageSize);

  // Calculate the counts of robots with different statuses
  const runningCount = filteredRobots.filter(robot => robot.hbStatus).length;
  const stoppedCount = filteredRobots.filter(robot => !robot.hbStatus).length;
  const delayedCount = filteredRobots.filter(robot => robot.needUpdate).length;

  const [robotNames, setRobotNames] = useState([]);
  const [robotHbStatuses, setRobotHbStatuses] = useState([]);
  const [robotVersions, setRobotVersions] = useState([]);
  const [robotTechnologies, setRobotTechnologies] = useState([]);

  useEffect(() => {
    // Extract robot names from the robots data
    const names = robots.map(robot => robot.name);
    // Remove duplicate names using Set
    const uniqueNames = [...new Set(names)];
    setRobotNames(uniqueNames);

    // Extract robot HB statuses from the robots data
    const hbStatuses = robots.map(robot => robot.hbStatus);
    // Remove duplicate statuses using Set
    const uniqueHbStatuses = [...new Set(hbStatuses)];
    setRobotHbStatuses(uniqueHbStatuses);

    // Extract robot versions from the robots data
    const versions = robots.map(robot => robot.version);
    // Remove duplicate versions using Set
    const uniqueVersions = [...new Set(versions)];
    setRobotVersions(uniqueVersions);

    // Extract robot technologies from the robots data
    const technologies = robots.reduce((acc, robot) => {
      robot.plugins.forEach(plugin => {
        acc.add(plugin.s_ID);
      });
      return acc;
    }, new Set());
    setRobotTechnologies([...technologies]);
  }, [robots]);

  // Function to handle robot name filter change
  const handleRobotNameFilterChange = (e) => {
    const { value } = e.target;
    setFilter({ ...filter, name: value });
  };

  const [robot, setRobot] = useState({
    robotId: "",
    name: "",
    heartBeat: false,
    hbmax: "",
    hbStatus: "",
    version: "",
    siteManagerAddress: "",
    hasSiteManagerIssue: false,
    plugins: [],
    components: [],
    certificates: {},
    ips: { public: "", private: [] },
    lastStatus: {
      s_dst: "",
      s_src: "",
      s_host: "",
      s_name: "",
      tp_hbmax: "",
      b_stopped: false,
      ls_queues: [],
      s_robotId: "",
      s_version: "",
      ls_plugins: [],
      s_sourceIp: "",
      td_timestamp: "",
      ls_privateIps: [],
      ls_collectors: [],
      ls_components: [],
      ls_certificats: [],
      s_systemVersion: "",
      s_sharedDataHash: "",
      s_siteManagerAddress: "",
      ls_resourceThresholds: []
    },
    endpoint: "",
    host: "",
    storageName: null,
    needUpdate: false,
    queues: [],
    isPrivate: false
  });
  const [showMore, setShowMore] = useState(false); // State variable to track show more/less
  const [openModal, setOpenModal] = useState(false);

  const { robotId } = useParams();

  useEffect((robotId) => {
    loadRobot();
  }, [robotId]);

  const loadRobot = async (robotId) => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/callrobot/${robotId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`
        }
      });
      const robotData = response.data;
      setRobot(robotData);
    } catch (error) {
      console.error("Error loading robot:", error);
    }
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Modify toggleModal to accept robotId parameter
  const toggleModal = (robotId) => {
    setOpenModal(!openModal);
    if (!openModal && robotId) {
      loadRobot(robotId);
    }
  };

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Robots Listing</CardTitle>
            <button className="btn btn-outline-primary" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the robots
          </CardSubtitle>
          <div className="py-4">
            <Row className="form-row mb-3 ">
              <div className="col">
                <select
                  className="form-control"
                  name="name"
                  value={filter.name}
                  onChange={handleRobotNameFilterChange}
                >
                  <option value="">Filter by name</option>
                  {robotNames.map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <select
                  className="form-control"
                  name="hbStatus"
                  value={filter.hbStatus}
                  onChange={handleFilterChange}
                >
                  <option value="">Filter by status</option>
                  {robotHbStatuses.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="col-5">
                <select
                  className="form-control"
                  name="technologies"
                  value={filter.technologies}
                  onChange={handleFilterChange}
                >
                  <option value="">Filter by technologies</option>
                  {robotTechnologies.map((technology, index) => (
                    <option key={index} value={technology}>{technology}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <select
                  className="form-control"
                  name="version"
                  value={filter.version}
                  onChange={handleFilterChange}
                >
                  <option value="">Filter by version</option>
                  {robotVersions.map((version, index) => (
                    <option key={index} value={version}>{version}</option>
                  ))}
                </select>
              </div>
            </Row>
            <Row className="form-row mb-3 ">
              <Col sm="4" lg="31">
                <FontAwesomeIcon icon={faPlayCircle} size="2x" className="mr-1 text-success" /> Running: {runningCount}
              </Col>
              <Col sm="4" lg="31">
                <FontAwesomeIcon icon={faStopCircle} size="2x" className="mr-1 text-danger" /> Stopped: {stoppedCount}
              </Col>
              <Col sm="4" lg="31">
                <FontAwesomeIcon icon={faExclamationCircle} size="2x" className="mr-1 text-warning" /> Delayed: {delayedCount}
              </Col>
            </Row>
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">HBstatus</th>
                  <th scope="col">Storage name</th>
                  <th scope="col">Need update</th>
                  <th scope="col">Privacy</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRobots.slice(offset, offset + pageSize).map((robot, index) => (
                  <tr key={robot.robotId}>
                    <td>{robot.name}</td>
                    <td>
                      {robot.hbStatus === "onTime" ? (
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                      ) : (
                        <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />
                      )}
                    </td>
                    <td>{robot.storageName ? robot.storageName : <FontAwesomeIcon icon={faExclamationCircle} className="text-warning" />}</td>
                    <td>
                      {robot.needUpdate ? (
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                      ) : (
                        <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />
                      )}
                    </td>
                    <td>{robot.isPrivate ? <span className="badge bg-primary">Private</span> : <span className="badge bg-secondary">Public</span>}</td>
                    <td>
                      {/* Modify button to pass robotId to toggleModal function */}
                      <Button className="btn btn-primary mx-2" onClick={() => toggleModal(robot.robotId)}>
                        <FontAwesomeIcon icon={faEye} /> Details
                      </Button>
                      <button className="btn btn-gray mx-2" onClick={() => handleRebootConfirmation(robot.robotId)} >
                        <FontAwesomeIcon icon={faSpinner} /> Reboot
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
            />
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Confirmation</ModalHeader>
        <ModalBody>Are you sure you want to reboot this robot?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleReboot}>Yes</Button>{' '}
          <Button color="secondary" onClick={() => setModalOpen(!modalOpen)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={successModalOpen} toggle={() => setSuccessModalOpen(!successModalOpen)}>
        <ModalHeader toggle={() => setSuccessModalOpen(!successModalOpen)}>Success</ModalHeader>
        <ModalBody>Reboot request sent ! this may take few moments....</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setSuccessModalOpen(!successModalOpen)}>Close</Button>
        </ModalFooter>
      </Modal>

      {/* **********************Modal for displaying robot details ********************************/}
      <Modal isOpen={openModal} toggle={() => toggleModal()} size="xl">
        <ModalHeader toggle={() => toggleModal()}>Robot Details</ModalHeader>
        <ModalBody style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
          <Card >
          <CardBody>
          <CardTitle tag="h5"> Details of Robot with ID: {robot.robotId}</CardTitle>
           
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Name:</b> {robot.name}
              </li>
              <li className="list-group-item">
                <b>Heartbeat:</b> {robot.heartBeat}
              </li>
              <li className="list-group-item">
                <b>Version:</b> {robot.version}
              </li>
              <li className="list-group-item">
                <b>Site Manager Address:</b> {robot.siteManagerAddress}
              </li>
              <li className="list-group-item">
                <b>Has Site Manager Issue:</b> {robot.hasSiteManagerIssue ? "Yes" : "No"}
              </li>
              {robot.certificates && Object.values(robot.certificates).length > 0 && (
                <li className="list-group-item">
                  <b>Certificates:</b>
                  <ul>
                    {Object.values(robot.certificates).map((certificate, index) => (
                      <li key={index}>{certificate.s_pattern} - Expiration Date: {certificate.td_expirationDate}</li>
                    ))}
                  </ul>
                </li>
              )}
              <li className="list-group-item">
                <b>Public IP:</b> {robot.ips.public}
              </li>
              <li className="list-group-item">
                <b>Last Status:</b> {robot.lastStatus.s_src}
              </li>
             
                
                  <li className="list-group-item">
                    <b>Endpoint:</b> {robot.endpoint}
                  </li>
                  <li className="list-group-item">
                    <b>Host:</b> {robot.host}
                  </li>
                  <li className="list-group-item">
                    <b>Storage Name:</b> {robot.storageName}
                  </li>
                  <li className="list-group-item">
                    <b>Plugins:</b>
                    <ul>
                      {robot.plugins.map((plugin, index) => (
                        <li key={index}>{plugin.s_ID} - Version: {plugin.s_version}</li>
                      ))}
                    </ul>
                  </li>
                  <li className="list-group-item">
                    <b>Components:</b>
                    <ul>
                      {robot.components.map((component, index) => (
                        <li key={index}>{component.s_name} - Version: {component.s_version}</li>
                      ))}
                    </ul>
                  </li>
                
              
              
            </ul>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => toggleModal()}>OK</Button>
         
        </ModalFooter>
      </Modal>
    </div>
  );
}
