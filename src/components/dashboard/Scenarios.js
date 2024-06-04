import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardTitle, CardSubtitle, Row, Dropdown, DropdownMenu, DropdownItem, DropdownToggle,Modal, ModalHeader, ModalBody, ModalFooter,Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheckCircle,  faClock,  faEllipsisV, faPlayCircle, faStopCircle, } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from 'react-paginate';
import {  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";



export default function Scenarios() {
  const [scenarios, setScenarios] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [actionScenarioId, setActionScenarioId] = useState(null);
  const [actionType, setActionType] = useState(null);

  const [filter, setFilter] = useState({
    zoneName: "",
    scriptName: "",
    applicationName: ""
  });
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4; // Number of items per page
  const navigate = useNavigate();

  // Define a state variable to store unique zone, script, app names
  const [zoneNames, setZoneNames] = useState([]);
  const [scriptNames, setScriptNames] = useState([]);
  const [applicationNames, setApplicationNames] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({}); // State for managing dropdowns per row
  
  /************************************************* */
   // State variables for the date range modal
   const [dateRange, setDateRange] = useState({
    from: "",
    to: ""
  });
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [efficiencyModalOpen, setEfficiencyModalOpen] = useState(false);
  const [sitesModalOpen, setSitesModalOpen] = useState(false);
  const [robotsModalOpen, setRobotsModalOpen] = useState(false);


  const [selectedScenarioId, setSelectedScenarioId] = useState(null); // State for storing selected scenario ID
  const [Sites, setSites] = useState([]);
  const { id } = useParams();



  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/scenarios",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setScenarios(response.data);
    } catch (error) {
      console.error("Error loading scenarios:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
    setCurrentPage(0); // Reset to first page when filter changes
  };

  const filteredScenarios = scenarios.filter(scenario => {
    return (
      (scenario.zoneName?.toLowerCase().includes(filter.zoneName.toLowerCase()) || filter.zoneName === "") &&
      (String(scenario.scriptName)?.includes(filter.scriptName.toLowerCase()) || filter.scriptName === "") &&
      (String(scenario.applicationName)?.includes(filter.applicationName.toLowerCase()) || filter.applicationName === "") 
    );
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  
  const offset = currentPage * pageSize;
  const pageCount = Math.ceil(filteredScenarios.length / pageSize);

  // useEffect to extract and set unique zone, script, and app names
  useEffect(() => {
    const zones = scenarios.map(scenario => scenario.zoneName).filter(Boolean);
    const uniqueZoneNames = [...new Set(zones)];
    setZoneNames(uniqueZoneNames);

    const scripts = scenarios.map(scenario => scenario.scriptName).filter(Boolean);
    const uniqueScriptNames = [...new Set(scripts)];
    setScriptNames(uniqueScriptNames);

    const applications = scenarios.map(scenario => scenario.applicationName).filter(Boolean);
    const uniqueApplicationNames = [...new Set(applications)];
    setApplicationNames(uniqueApplicationNames);
  }, [scenarios]);

  const toggleDropdown = (index) => {
    setDropdownOpen(prevState => ({
      ...prevState,
      [index]: !prevState[index] // Toggle the dropdown state for the specific row index
    }));
  };
  const handleActionConfirmation = (id, type) => {
    setActionScenarioId(id);
    setActionType(type);
    setModalOpen(true);
  };
  

  const handleAction = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      switch (actionType) {
        case 'start':
          await axios.get(
            `http://localhost:8080/scenario/${actionScenarioId}/start`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`
              }
            }
          );
          break;
        case 'stop':
          await axios.get(
            `http://localhost:8080/scenario/${actionScenarioId}/stop`,
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
      console.error(`Error ${actionType} scenario:`, error);
    }
  };
  const handleEfficiencyClick = (scenarioId) => {
    setSelectedScenarioId(scenarioId);
    setEfficiencyModalOpen(true);
  };

  const handleEfficiencySubmit= async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      
      // Format the dates
      const fromDate = dateRange.from.replace('T', ' ') + ':00'; // Add seconds
      const toDate = dateRange.to.replace('T', ' ') + ':00'; // Add seconds
      
      const response = await axios.post(
        `http://localhost:8080/scenario/rate/${selectedScenarioId}`, // Use the selected scenario ID
        {
          dates: {
            from: fromDate,
            to: toDate
          }
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
  
      // Display response as a notification
      toast.success(JSON.stringify(response.data.message)
      );
    } catch (error) {
      console.error("Error getting rate:", error);
      toast.error("Error getting rate");
    }
  }; 
  const handleSitesClick = (scenarioId) => {
    setSelectedScenarioId(scenarioId);
    setSitesModalOpen(true);
  };
  const CustomToast = ({ message, type }) => {
    return (
      <div className={`toast show text-white bg-${type}`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-body">
          {message}
        </div>
      </div>
    );
  };
  
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage("");
    }, 10000); // Hide toast after 5 seconds
  };

  const handleSitesName = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      
      // Format the dates
      const fromDate = dateRange.from.replace('T', ' ') + ':00'; // Add seconds
      const toDate = dateRange.to.replace('T', ' ') + ':00'; // Add seconds
      
      const response = await axios.post(
        `http://localhost:8080/scenario/name_site/${selectedScenarioId}`,
        {
          dates: {
            from: fromDate,
            to: toDate
          }
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      const siteNames = response.data.siteNames.join(", ");
      showToast(`Sites: ${siteNames}`, "success");
    } catch (error) {
      console.error("Error getting sites", error);
      showToast("Error getting sites", "error");
    }
  };
  const handleRobotsClick = (scenarioId) => {
    setSelectedScenarioId(scenarioId);
    setRobotsModalOpen(true);
  };
  const handleRobotsName = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      
      // Format the dates
      const fromDate = dateRange.from.replace('T', ' ') + ':00'; // Add seconds
      const toDate = dateRange.to.replace('T', ' ') + ':00'; // Add seconds
      
      const response = await axios.post(
        `http://localhost:8080/scenario/robot/${selectedScenarioId}`,
        {
          dates: {
            from: fromDate,
            to: toDate
          }
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      const robotNames = response.data.map(robot => robot.robot_name).join(", ");
      showToast(`Robots: ${robotNames}`, "success");
    } catch (error) {
      console.error("Error getting robots:", error);
      showToast("Error getting robots", "error");
    }
  };

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Scenarios Listing</CardTitle>
            <button className="btn btn-outline-primary" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the scenarios
          </CardSubtitle>
          <div className="py-4">
            <Row className="form-row mb-3 ">
              <div className="col">
                <select
                  className="form-control"
                  name="zoneName"
                  value={filter.zoneName}
                  onChange={handleFilterChange}
                >
                  <option value="">Filter by zone name</option>
                  {zoneNames.map((zoneName, index) => (
                    <option key={index} value={zoneName}>{zoneName}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <select
                  className="form-control"
                  name="scriptName"
                  value={filter.scriptName}
                  onChange={handleFilterChange}
                >
                  <option value="">Filter by user journey</option>
                  {scriptNames.map((scriptName, index) => (
                    <option key={index} value={scriptName}>{scriptName}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <select
                  className="form-control"
                  name="applicationName"
                  value={filter.applicationName}
                  onChange={handleFilterChange}
                >
                  <option value="">Filter by application</option>
                  {applicationNames.map((applicationName, index) => (
                    <option key={index} value={applicationName}>{applicationName}</option>
                  ))}
                </select>
              </div>
            </Row>
            
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">NAME</th>
                  <th scope="col">ZONE NAME</th>
                  <th scope="col">ACTIVE</th>
                  <th scope="col">TECHNOLOGY</th>
                  <th scope="col">START DATE</th>
                  <th scope="col">END DATE</th>
                  
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filteredScenarios.slice(offset, offset + pageSize).map((scenario, index) => (
                  <tr key={scenario.id}>
                    <td>{scenario.name}</td>
                    <td>{scenario.zoneName}</td>
                    <td>
                      {scenario.active === 0 ? (
                        <FontAwesomeIcon icon={faClock} className="text-danger" />
                      ) : (
                        <FontAwesomeIcon icon={faClock} className="text-success" />
                      )}
                    </td>
                    <td>{scenario.plugins.Name}</td>
                    <td>{scenario.startDate}</td>
                    <td>{scenario.endDate}</td>
                    <td>
                      <Dropdown isOpen={dropdownOpen[index]} toggle={() => toggleDropdown(index)}>
                        <DropdownToggle color="white">
                          <FontAwesomeIcon icon={faEllipsisV} />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem header>Actions</DropdownItem>
                          <DropdownItem onClick={() => handleActionConfirmation(scenario.id, 'start')}>
                            <FontAwesomeIcon icon={faPlayCircle} /> Start
                          </DropdownItem>
                          <DropdownItem onClick={() => handleActionConfirmation(scenario.id, 'stop')}>
                            <FontAwesomeIcon icon={faStopCircle} /> Stop
                          </DropdownItem>
                          <DropdownItem> <FontAwesomeIcon icon={faCheckCircle} /> Enable</DropdownItem>
                          <DropdownItem> <FontAwesomeIcon icon={faBan} /> Disable</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem onClick={() => handleSitesClick(scenario.id)}>Sites</DropdownItem>
                          <DropdownItem onClick={() => handleRobotsClick(scenario.id)}>Robots</DropdownItem>
                          <DropdownItem onClick={() => handleEfficiencyClick(scenario.id)}>Performance</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {toastMessage && <CustomToast message={toastMessage} type={toastType} />}
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
        <ModalBody>Are you sure you want to {actionType} this scenario?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleAction}>Yes</Button>{' '}
          <Button color="secondary" onClick={() => setModalOpen(!modalOpen)}>Cancel</Button>
        </ModalFooter>
      </Modal>
     
<Modal isOpen={successModalOpen} toggle={() => setSuccessModalOpen(!successModalOpen)}>
        <ModalHeader toggle={() => setSuccessModalOpen(!successModalOpen)}>Success</ModalHeader>
        <ModalBody>scenario {actionType}ed successfully!</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setSuccessModalOpen(!successModalOpen)}>Close</Button>
        </ModalFooter>
      </Modal>
      {/* *************************Efficinecy modal***************************************************************/} 
         {/* Main content */}
         <Modal isOpen={efficiencyModalOpen} toggle={() => setDateModalOpen(!dateModalOpen)}>
         <ModalHeader toggle={() => setEfficiencyModalOpen(!efficiencyModalOpen)}>Select Date Range</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="from">From</label>
            <input type="datetime-local" className="form-control" id="from" value={dateRange.from} onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="to">To</label>
            <input type="datetime-local" className="form-control" id="to" value={dateRange.to} onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEfficiencySubmit}>Submit</Button>
          <Button color="secondary" onClick={() => setEfficiencyModalOpen(!efficiencyModalOpen)}>Cancel</Button>
          <Button color="secondary" onClick={() => setEfficiencyModalOpen(!efficiencyModalOpen)}>Check robots</Button>
          

        </ModalFooter>
      </Modal>
         {/* *************************sites name modal***************************************************************/} 

      <Modal isOpen={sitesModalOpen} toggle={() => setDateModalOpen(!dateModalOpen)}>
      <ModalHeader toggle={() => setSitesModalOpen(!sitesModalOpen)}>Select Date Range</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="from">From</label>
            <input type="datetime-local" className="form-control" id="from" value={dateRange.from} onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="to">To</label>
            <input type="datetime-local" className="form-control" id="to" value={dateRange.to} onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSitesName}>Submit</Button>
          <Button color="secondary" onClick={() => setSitesModalOpen(!sitesModalOpen)}>Cancel</Button>

        </ModalFooter>
        </Modal>
               {/* *************************robots name modal***************************************************************/} 
               <Modal isOpen={robotsModalOpen} toggle={() => setDateModalOpen(!dateModalOpen)}>
      <ModalHeader toggle={() => setRobotsModalOpen(!robotsModalOpen)}>Select Date Range</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="from">From</label>
            <input type="datetime-local" className="form-control" id="from" value={dateRange.from} onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="to">To</label>
            <input type="datetime-local" className="form-control" id="to" value={dateRange.to} onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleRobotsName}>Submit</Button>
          <Button color="secondary" onClick={() => setRobotsModalOpen(!robotsModalOpen)}>Cancel</Button>

        </ModalFooter>
        </Modal>
      <ToastContainer />
    </div>
  );
}
