import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle,Row, Col  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClock, faExclamationCircle, faEye, faPlayCircle, faSpinner, faStopCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";import ReactPaginate from 'react-paginate';
import "./Sites.css"; // Import custom CSS for pagination styling

export default function Inventory() {
  const [inventory, setInventory] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState({
    name: ""
  });
  const [allSiteNames, setAllSiteNames] = useState([]);
  const pageSize = 10; // Number of items per page

  useEffect(() => {
    loadInventory();
  }, [currentPage]); // Reload sites when current page changes

  const loadInventory = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/inventory",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      // Extraction des données de l'inventaire
      const inventoryData = response.data.inventories;

      // Mise en forme des données pour les adapter à l'affichage dans votre tableau
      const formattedInventory = inventoryData.map(item => ({
        siteName: item.site_name,
        robotName: item.robot_name,
        version: item.robot_version,
        workerName: item.worker_name,
        workerStatus: item.worker_status,
        robotDiag: item.robot_diag_storage_name
      }));

      // Définition des données formatées dans l'état
      setInventory(formattedInventory);
      
      // Extraction des noms de tous les sites pour les utiliser dans le filtre
      const siteNames = inventoryData.map(item => item.site_name);
      setAllSiteNames([...new Set(siteNames)]); // Utilisation de Set pour éliminer les doublons
    } catch (error) {
      console.error("Error loading inventory:", error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleSelectSiteName = (selectedName) => {
    setFilter({ ...filter, name: selectedName });
  };

  const offset = currentPage * pageSize;
  const filteredInventories = inventory.filter(inv => {
    return (
      inv.siteName.toLowerCase().includes(filter.name.toLowerCase())
    );
  });
  const pageCount = Math.ceil(filteredInventories.length / pageSize);

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Inventory</CardTitle>
          </div>
          
          <div className="py-4">
            <Row className="form-row mb-3">
              <div className="col">
                <select
                  className="form-control"
                  placeholder="Filter by name"
                  name="name"
                  value={filter.name}
                  onChange={handleFilterChange}
                >
                  <option value="">Select a site</option>
                  {allSiteNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
            </Row>
            <Row className="form-row mb-3 ">
              <Col sm="3" lg="30">
                <FontAwesomeIcon icon={faPlayCircle} size="2x" className="mr-1 text-success" /> Running
              </Col>
              <Col sm="3" lg="30">
                <FontAwesomeIcon icon={faStopCircle} size="2x" className="mr-1 text-danger" /> Stopped
              </Col>
              <Col sm="3" lg="30">
                <FontAwesomeIcon icon={faClock} size="2x" className="mr-1 text-warning" /> Delayed

              </Col>
              <Col sm="3" lg="30">
                <FontAwesomeIcon icon={faExclamationCircle} size="2x" className="mr-1 text-primary" /> Unknown
                
              </Col>
            </Row>
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">SITE NAME</th>
                  <th scope="col">ROBOT NAME</th>
                  <th scope="col">VERSION</th>
                  <th scope="col">WORKER NAME</th>
                  <th scope="col">WORKER STATUS</th>
                  <th scope="col">ROBOT_DIAG</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventories.slice(offset, offset + pageSize).map((item, index) => (
                  <tr key={index}>
                    <td>{item.siteName}</td>
                    <td>{item.robotName}</td>
                    <td>{item.version}</td>
                    <td>{item.workerName}</td>
                    <td><td>
  {(() => {
    switch (item.workerStatus) {
      case "RUNNING":
        return <FontAwesomeIcon icon={faPlayCircle} className="text-success" />;
      case "STOPPED":
        return <FontAwesomeIcon icon={faStopCircle} className="text-danger" />;
        case "DELAYED":
        return <FontAwesomeIcon icon={faClock} className="text-warning" />;
        case "UNKNOWN":
        return <FontAwesomeIcon icon={faExclamationCircle} className="text-primary" />;
      default:
        return null; // Handle any other cases
    }
  })()}
</td></td>
                    <td>{item.robotDiag}</td>
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
    </div>
  );
}
