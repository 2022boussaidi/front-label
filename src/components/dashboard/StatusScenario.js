import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardTitle, CardSubtitle, Row } from "reactstrap";
import ReactPaginate from 'react-paginate';

export default function StatusScenario() {
  const [status, setStatus] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 3; // Number of items per page

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
     const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/scenario/status",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setStatus(response.data);
    } catch (error) {
      console.error("Error loading status:", error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * pageSize;

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Status Listing</CardTitle>
            <button className="btn btn-outline-primary" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Status of all active scenarios
          </CardSubtitle>
          <div className="py-4">
            <Row className="form-row mb-3 ">
              {/* You can add filter options here */}
            </Row>
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">Scenario name</th>
                  <th scope="col">Current status</th>
                  <th scope="col">Start time</th>
                </tr>
              </thead>
              <tbody>
                {status.slice(offset, offset + pageSize).map((item) => (
                  <tr key={item.scenarioId}>
                    <td>{item.scenarioName}</td>
                    <td>{item.currentStatus}</td>
                    <td>{item.startTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={Math.ceil(status.length / pageSize)}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              previousLinkClassName={"page-link"}
              nextLinkClassName={"page-link"}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
