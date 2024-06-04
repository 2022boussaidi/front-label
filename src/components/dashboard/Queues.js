import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, Button, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClock, faExclamationCircle, faTimesCircle, faRedo, faPlay, faStop, faRefresh, faEyeDropper, faEye, faSpinner, faPlayCircle, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from 'react-paginate';

export default function Overview() {
  const [queues, setQueues] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [filter, setFilter] = useState({
    siteName: "",
    robotName: "",
    status: "",
    interactive: "",
    technologies: ""
  });
  const [runningCount, setRunningCount] = useState(0);
  const [stoppedCount, setStoppedCount] = useState(0);
  const [interactiveCount, setInteractiveCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 7; // Number of items per page

  useEffect(() => {
    loadQueues();
  }, []);

  useEffect(() => {
    // Update counts whenever queues change
    updateCounts();
  }, [queues]);

  const loadQueues = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/callqueues",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setQueues(response.data.queues);
    } catch (error) {
      console.error("Error loading queues:", error);
    }
  };

  const updateCounts = () => {
    // Calculate counts of running, stopped, and interactive queues
    const running = queues.filter(queue => queue.status === "running").length;
    const stopped = queues.filter(queue => queue.status === "stopped").length;
    const interactive = queues.filter(queue => queue.interactive).length;
    
    // Update state variables with the counts
    setRunningCount(running);
    setStoppedCount(stopped);
    setInteractiveCount(interactive);
  };
  const [actionQueueId, setActionQueueId] = useState(null);
  const [actionType, setActionType] = useState(null);

  const handleActionConfirmation = (queueId, type) => {
    setActionQueueId(queueId);
    setActionType(type);
    setModalOpen(true);
  };

  const handleAction = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      switch (actionType) {
        case 'reset':
          await axios.patch(
            `http://localhost:8080/queue/reset/${actionQueueId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`
              }
            }
          );
          break;
        case 'start':
          await axios.patch(
            `http://localhost:8080/queue/start/${actionQueueId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`
              }
            }
          );
          break;
        case 'stop':
          await axios.patch(
            `http://localhost:8080/queue/stop/${actionQueueId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`
              }
            }
          );
          break;
        case 'reserve':
          await axios.post(
            `http://localhost:8080/queue/reserve/${actionQueueId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`
              }
            }
          );
          break;
        default:
          break;
      }
      setSuccessModalOpen(true);
      setModalOpen(false);
    } catch (error) {
      console.error(`Error ${actionType} queue:`, error);
    }
  };


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };
  const handleRobotNameFilterChange = (e) => {
    const { value } = e.target;
    setFilter({ ...filter, robotName: value });
  };
  

  const filteredQueues = queues.filter(queue => {
    return (
      (queue.siteName?.toLowerCase().includes(filter.siteName.toLowerCase()) || filter.siteName === "") &&
      (queue.robot?.name?.toLowerCase().includes(filter.robotName.toLowerCase()) || filter.robotName === "") &&
      (String(queue.status)?.includes(filter.status) || filter.status === "") &&
      (String(queue.interactive)?.includes(filter.interactive) || filter.interactive === "") &&
      (filter.technologies === "" || (queue.technologies || []).includes(filter.technologies))
    );
  });
  
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * pageSize;
  const pageCount = Math.ceil(filteredQueues.length / pageSize);
 // Define a state variable to store unique robot names
const [robotNames, setRobotNames] = useState([]);
const [queueSiteName, setqueueSiteName] = useState([]);
const [workerStatus, setworkerStatus] = useState([]);
const [workerInteractive, setworkerInteractive] = useState([]);


// useEffect to extract and set unique robot names
useEffect(() => {
  // Extract robot names from the queues data
  const names = queues.map(queue => queue.robot?.name).filter(Boolean);
  // Remove duplicate names using Set
  const uniqueNames = [...new Set(names)];
  // Update state with unique robot names
  setRobotNames(uniqueNames);
  const sites = queues.map(queue => queue.siteName);
  // Remove duplicate names using Set
  const uniqueSites = [...new Set(sites)];
  // Update state with unique robot names
  setqueueSiteName(uniqueSites);

  const Status = queues.map(queue => queue.status);
  const uniqueStatus= [...new Set(Status)];
  setworkerStatus(uniqueStatus);
  
  const interactive = queues.map(queue => queue.interactive);
  const uniqueinteractive= [...new Set(interactive)];
  setworkerInteractive(uniqueinteractive);

}, [queues]);
  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Workers Listing</CardTitle>
            <button className="btn btn-outline-primary" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the workers
          </CardSubtitle>
          <div className="py-4">
          <Row className="form-row mb-3 ">
          <div className="col">
  <select
    className="form-control"
    name="robotName"
    value={filter.robotName}
    onChange={handleRobotNameFilterChange}
  >
    <option value="">Filter by robot name</option>
    {robotNames.map((name, index) => (
      <option key={index} value={name}>{name}</option>
    ))}
  </select>
</div>
              <div className="col">
                <select
                  
                  className="form-control"
                 
                  name="siteName"
                  value={filter.siteName}
                  onChange={handleFilterChange}
                
                > <option value="">Filter by site name</option>
                {queueSiteName.map((siteName, index) => (
                  <option key={index} value={siteName}>{siteName}</option>
                ))}
              </select>
              </div>
              <div className="col">
                <select
                  className="form-control"
                  name="status"
                  value={filter.status}
                  onChange={handleFilterChange}
                >
                  <option value="">Filter by status</option>
                  {workerStatus.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <select
                  className="form-control"
                  name="interactive"
                  value={filter.interactive}
                  onChange={handleFilterChange}
                >
                  <option value="">Filter by interactive</option>
                  {workerInteractive.map((interactive, index) => (
                    <option key={index} value={interactive}>{interactive}</option>
                  ))}
                </select>
              </div>
              
            </Row>
            <Row className="form-row mb-3 ">
              <Col sm="4" lg="31">
                <FontAwesomeIcon icon={faPlayCircle} size="2x" className="  mr-1 text-success col-1" /> Running: {runningCount}
              </Col>
              <Col sm="4" lg="31">
                <FontAwesomeIcon icon={faStopCircle} size="2x" className="mr-1 text-danger col-1" /> Stopped: {stoppedCount}
              </Col>
              <Col sm="4" lg="31">
                <FontAwesomeIcon icon={faExclamationCircle} size="2x" className="mr-1 text-warning col-1" /> Interactive: {interactiveCount}
              </Col>
            </Row>
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">Site name</th>
                  <th scope="col">Robot name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Interactive</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredQueues.slice(offset, offset + pageSize).map((queue, index) => (
                  <tr key={queue.queueId}>
                    <td>{queue.siteName}</td>
                    <td>{queue.robot.name}</td>
                    <td>
                      {queue.status === 2 ? (
                        <FontAwesomeIcon icon={faPlayCircle} className="text-success" />
                      ) : (
                        <FontAwesomeIcon icon={faStopCircle} className="text-danger" />
                      )}
                    </td>
                    <td>
                      {queue.interactive  ? (
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                      ) : (
                        <FontAwesomeIcon icon={faExclamationCircle} className="text-warning" />
                      )}
                    </td>
                    <td>
                      <Link className="btn btn-primary mx-2" to={`/viewqueue/${queue.queueId}`}>
                        <FontAwesomeIcon icon={faEye} /> Details
                      </Link>
                      <Link className="btn btn-secondry mx-2" onClick={() => handleActionConfirmation(queue.queueId, 'reset')} >
                        <FontAwesomeIcon icon={faRedo} />
                      </Link>
                      <Link className="btn btn-secondry mx-2" onClick={() => handleActionConfirmation(queue.queueId, 'start')}>
                        <FontAwesomeIcon icon={faPlay} />
                      </Link>
                      <Link className="btn btn-secondry mx-2" onClick={() => handleActionConfirmation(queue.queueId, 'stop')}>
                        <FontAwesomeIcon icon={faStop} />
                      </Link>
                      <Link className="btn btn-secondry mx-2" onClick={() => handleActionConfirmation(queue.queueId, 'reserve')}>
                        <FontAwesomeIcon icon={faRefresh} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Row className="form-row mb-3 ">
              <Col sm="3" lg="31">
                <FontAwesomeIcon icon={faRedo} size="1x"  /> Reset
              </Col>
              <Col sm="3" lg="31">
                <FontAwesomeIcon icon={faPlay} size="1x"  /> Start
              </Col>
              <Col sm="3" lg="31">
                <FontAwesomeIcon icon={faStop} size="1x"  /> Stop
              </Col>
              <Col sm="3" lg="31">
                <FontAwesomeIcon icon={faRefresh} size="1x"  /> Reserve
              </Col>
            </Row>
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
        <ModalBody>Are you sure you want to {actionType} this queue?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleAction}>Yes</Button>{' '}
          <Button color="secondary" onClick={() => setModalOpen(!modalOpen)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={successModalOpen} toggle={() => setSuccessModalOpen(!successModalOpen)}>
        <ModalHeader toggle={() => setSuccessModalOpen(!successModalOpen)}>Success</ModalHeader>
        <ModalBody>Queue {actionType}ed successfully!</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setSuccessModalOpen(!successModalOpen)}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
