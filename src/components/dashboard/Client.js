import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPeopleArrowsLeftRight, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7); // Change the number of items per page as desired

  const { id } = useParams();

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/clients",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setClients(response.data);
    } catch (error) {
      console.error("Error loading clients:", error);
    }
  };

  // Calculate the index of the last item to display
  const indexOfLastClient = currentPage * itemsPerPage;
  // Calculate the index of the first item to display
  const indexOfFirstClient = indexOfLastClient - itemsPerPage;
  // Slice the users array to get the users for the current page
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  // Function to handle "Next" button click
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Function to handle "Previous" button click
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Clients Listing</CardTitle>
            <div className="outline-primary">
  {clients.length ? `Total clients: ${clients.length}` : "No clients found"}
</div>

          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the clients
          </CardSubtitle>
          <div className="py-4">
            <Table bordered>
              <thead>
                <tr>
                  <th scope="col"> Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Creation date</th>
                  <th scope="col">Active</th>
                  <th scope="col">Partner</th>
                  <th scope="col">Entreprise name </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentClients.map(client => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.dateCreated}</td>
                    <td>
                      {client.isActive ? (
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                      ) : (
                        <FontAwesomeIcon icon={faCheckCircle} className="text-danger" />
                      )}
                    </td>
                    <td>
                      {client.isPartner ? (
                        <FontAwesomeIcon icon={faPeopleArrowsLeftRight} className="text-success" />
                      ) : (
                        <FontAwesomeIcon icon={faTriangleExclamation} className="text-danger" />
                      )}
                    </td>
                    <td>{client.entrepriseName}</td>
                    <td>
                      <Link className="btn btn-warning mx-2" to={`/clients/${client.id}`}>
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* Pagination */}
            <div className="pagination">
              <button className="btn btn-primary" onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span className="mx-2">Page {currentPage}</span>
              <button className="btn btn-primary" onClick={handleNextPage} disabled={indexOfLastClient >= clients.length}>
                Next
              </button>
            </div>
          </div>
          
        </CardBody>
      </Card>
    </div>
  );
}
