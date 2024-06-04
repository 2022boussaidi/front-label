import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPeopleArrowsLeftRight, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Change the number of items per page as desired

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/users",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  // Calculate the index of the last item to display
  const indexOfLastUser = currentPage * itemsPerPage;
  // Calculate the index of the first item to display
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  // Slice the users array to get the users for the current page
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

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
            <CardTitle tag="h5">Users Listing</CardTitle>
            <div className="outline-primary">
  {users.length ? `Total users: ${users.length}` : "No users found"}
</div>

          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the users
          </CardSubtitle>
          <div className="py-4">
            <Table bordered>
              <thead>
                <tr>
                  <th scope="col">First name</th>
                  <th scope="col">Last name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Active</th>
                  <th scope="col">Partner</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isActive ? (
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                      ) : (
                        <FontAwesomeIcon icon={faCheckCircle} className="text-danger" />
                      )}
                    </td>
                    <td>
                      {user.isPartner ? (
                        <FontAwesomeIcon icon={faPeopleArrowsLeftRight} className="text-success" />
                      ) : (
                        <FontAwesomeIcon icon={faTriangleExclamation} className="text-danger" />
                      )}
                    </td>
                    <td>{user.roleName}</td>
                    <td>
                      <Link className="btn btn-warning mx-2" to={`/users/${user.id}`}>
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
              <button className="btn btn-primary" onClick={handleNextPage} disabled={indexOfLastUser >= users.length}>
                Next
              </button>
            </div>
          </div>
          <Link className="btn btn-outline-primary mx-2" to="/adduser">
            Add Member
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
