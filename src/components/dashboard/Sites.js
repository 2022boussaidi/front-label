import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEye, faGlobe, faInfo, faQuestionCircle, faTimesCircle, faUndo, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from 'react-paginate';
import "./Sites.css"; // Import custom CSS for pagination styling

export default function Sites() {
  const [sites, setSites] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [resetSiteId, setResetSiteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState({
    name: "",
    scenarioCount: "",
    zoneCount: "",
    queueCount: ""
  });
  const [allSiteNames, setAllSiteNames] = useState([]);
  const pageSize = 10; // Number of items per page

  useEffect(() => {
    loadSites();
  }, [currentPage]); // Reload sites when current page changes

  const loadSites = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/callsites",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setSites(response.data.sites);
      setAllSiteNames(response.data.sites.map(site => site.name));
    } catch (error) {
      console.error("Error loading sites:", error);
    }
  };

  const handleResetConfirmation = (siteId) => {
    setResetSiteId(siteId);
    setModalOpen(true);
  };

  const handleReset = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:8080/site/${resetSiteId}/resetQueues`,
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
      console.error("Error resetting queues:", error);
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
  const filteredSites = sites.filter(site => {
    return (
      site.name.toLowerCase().includes(filter.name.toLowerCase()) //&&
     // String(site.scenarioNb).includes(filter.scenarioCount) &&
     // String(site.zoneNb).includes(filter.zoneCount) &&
     // String(site.queueNb).includes(filter.queueCount)
    );
  });
  const pageCount = Math.ceil(filteredSites.length / pageSize);

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Sites Listing</CardTitle>
            <button className="btn btn-outline-primary" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the sites
          </CardSubtitle>
          <div className="py-4">
            <div className="form-row mb-3" >
              <div className="col">
                <select
                  className="form-control"
                  placeholder="Filter by name"
                  name="name"
                
                  value={filter.name}
                  onChange={handleFilterChange}
                >
                  <option value="">
                   Select a site</option>
                  {allSiteNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Privacy</th>
                  <th scope="col">Zone Count</th>
                  <th scope="col">Proxy</th>
                  <th scope="col">Site manager issue</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSites.slice(offset, offset + pageSize).map((site, index) => (
                  <tr key={site.siteId}>
                    <td>{site.name}</td>
                    <td>{site.isPrivate ? <span className="badge bg-primary">Private</span> : <span className="badge bg-secondary">Public</span>}</td>
                    <td>{site.zoneNb}</td>
                    <td>
                      {site.proxy ? (
                        <span className="badge bg-secondary">{`${site.proxy.url}:${site.proxy.port} - ${site.proxy.type}`}</span>
                      ) : (
                        <FontAwesomeIcon icon={faQuestionCircle} className="text-danger" />
                      )}
                    </td>
                    <td>
                      {site.hasSiteManagerIssue ? (
                        <FontAwesomeIcon icon={faCheckCircle} />
                      ) : (
                        <FontAwesomeIcon icon={faTimesCircle} />
                      )}
                    </td>
                    <td>
                      <Link className="btn btn-primary mx-2" to={`/viewsite/${site.siteId}`}>
                        <FontAwesomeIcon icon={faEye} /> Details
                      </Link>
                      <button className="btn btn-gray mx-2" onClick={() => handleResetConfirmation(site.siteId)}>
                        <FontAwesomeIcon icon={faUndo} /> Reset
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
        <ModalBody>Are you sure you want to reset the queues for this site?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleReset}>Yes</Button>{' '}
          <Button color="secondary" onClick={() => setModalOpen(!modalOpen)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={successModalOpen} toggle={() => setSuccessModalOpen(!successModalOpen)}>
        <ModalHeader toggle={() => setSuccessModalOpen(!successModalOpen)}>Success</ModalHeader>
        <ModalBody>Queues reset successfully!</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setSuccessModalOpen(!successModalOpen)}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
