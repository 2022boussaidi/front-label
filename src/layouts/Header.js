import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Card,
  CardBody
} from 'reactstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faInfoCircle, faQuestionCircle, faSignOutAlt, faHome, faRobot, faChartColumn, faBell } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false); // State for the first dropdown
  const [dropdownOpen2, setDropdownOpen2] = useState(false); // State for the second dropdown
  const [userInfo, setUserInfo] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);
  const toggleDropdown1 = () => setDropdownOpen1((prevState) => !prevState); // Toggle function for the first dropdown
  const toggleDropdown2 = () => setDropdownOpen2((prevState) => !prevState); // Toggle function for the second dropdown

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleMyAccount = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User not authenticated.');
      return;
    }

    fetch("http://localhost:8080/current", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user information');
      }
      return response.json();
    })
    .then(data => {
      setUserInfo(data);
      toggleModal(); // Open the modal after fetching user information
    })
    .catch(error => {
      console.error('Error fetching user information:', error);
    });
  };

  const toggleModal = () => setModal(!modal);
  const toggleAlertModal = () => setAlertModal(!alertModal);

  const removeDuplicates = (alerts) => {
    return [...new Set(alerts)];
  };

  const fetchAlerts = async () => {
    const response = await fetch('http://localhost:5001/api/alerts/error-alert');
    const data = await response.json();
    return removeDuplicates(data.alerts);
  };

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const alertsData = await fetchAlerts();
        setAlerts(alertsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching alerts:', error);
        setLoading(false);
      }
    };

    loadAlerts();
  }, []);

  return (
    <>
      <Navbar color="gray-800" dark expand="md">
        <div className="d-flex align-items-center">
          <Button color="dark" onClick={showMobilemenu}>
            <i className="bi bi-list"></i>
          </Button>
        </div>
        <NavbarBrand href="/" className="d-lg"></NavbarBrand>
        <div className="hstack gap-2">
          <Button
            color="dark"
            size="sm"
            className="d-sm-block d-md-none"
            onClick={toggle}
          >
            {isOpen ? <i className="bi bi-x"></i> : <i className="bi bi-three-dots-vertical"></i>}
          </Button>
        </div>
        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link to="https://www.ip-label.fr" className="nav-link">
                <FontAwesomeIcon icon={faInfoCircle} /> About Ekara
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/contact" className="nav-link">
                <FontAwesomeIcon icon={faQuestionCircle} /> Help
              </Link>
            </NavItem>
          </Nav>
          <Dropdown isOpen={alertModal} toggle={toggleAlertModal}>
            <DropdownToggle color="gray-800">
              <FontAwesomeIcon icon={faBell} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={toggleAlertModal}>Notifications</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown isOpen={dropdownOpen1} toggle={toggleDropdown1}>
            <DropdownToggle color="gray-800">
              <FontAwesomeIcon icon={faUser} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={handleMyAccount}>My Account</DropdownItem>
              <DropdownItem onClick={handleLogout}>Logout <FontAwesomeIcon icon={faSignOutAlt} /></DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown isOpen={dropdownOpen2} toggle={toggleDropdown2}>
            <DropdownToggle color="gray-800">
              <FontAwesomeIcon icon={faHome} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem> <FontAwesomeIcon icon={faRobot} /> Robots Dash </DropdownItem>
              <DropdownItem > <FontAwesomeIcon icon={faChartColumn} /> Measurements </DropdownItem>
            </DropdownMenu>
          </Dropdown>
         
        </Collapse>
      </Navbar>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>User Information</ModalHeader>
        <ModalBody>
          {userInfo && (
            <>
              <p>Email: {userInfo.email}</p>
              <p>First Name: {userInfo.firstname}</p>
              <p>Last Name: {userInfo.lastname}</p>
              <p>Role Name: {userInfo.roleName}</p>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={alertModal} toggle={toggleAlertModal}>
        <ModalHeader toggle={toggleAlertModal}>Alerts</ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              {loading ? (
                <div>Loading...</div>
              ) : (
                alerts.map((alert, index) => (
                  <Alert color="warning" key={index}>
                    {alert}
                  </Alert>
                ))
              )}
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Header;
