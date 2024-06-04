import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardTitle, CardSubtitle, Row, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot, faClock, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";


export default function Zones() {
  const [zones, setZones] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    
  });
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10; // Number of items per page

  // Define a state variable to store unique zone, script, app names
  const [zoneNames, setZoneNames] = useState([]);
  
  const [dropdownOpen, setDropdownOpen] = useState({}); // State for managing dropdowns per row

  useEffect(() => {
    loadZones();
  }, []);

  const loadZones = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/zones",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setZones(response.data);
    } catch (error) {
      console.error("Error loading zones:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
    setCurrentPage(0); // Reset to first page when filter changes
  };

  const filteredZones = zones.filter(zone => {
    return (
      (zone.name?.toLowerCase().includes(filter.name.toLowerCase()) || filter.name === "") 
    );
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  
  const offset = currentPage * pageSize;
  const pageCount = Math.ceil(filteredZones.length / pageSize);

  // useEffect to extract and set unique zone, script, and app names
  useEffect(() => {
    const zoneNamesArray = zones.map(zone => zone.name).filter(Boolean);
    const uniqueZoneNames = [...new Set(zoneNamesArray)];
    setZoneNames(uniqueZoneNames);

    
  }, [zones]);

  const toggleDropdown = (index) => {
    setDropdownOpen(prevState => ({
      ...prevState,
      [index]: !prevState[index] // Toggle the dropdown state for the specific row index
    }));
  };

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Zones Listing</CardTitle>
            <button className="btn btn-outline-primary" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the zones
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
              
              
            </Row>
            
            <table className="table border shadow">
              <thead>
                <tr>
                  
                  <th scope="col">Zone name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Associated sites</th>
                  <th scope="col">Associated applications</th>
                  <th scope="col">Scenario number</th>
                  <th scope="col">Actions</th>

                 
                  
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filteredZones.slice(offset, offset + pageSize).map((zone, index) => (
                  <tr key={zone.id}>
                    <td>{zone.name}</td>
                    <td>{zone.description}</td>
                    <td>
      {zone.sites.map(site => (
        <div key={site.id}>{site.name}</div>
      ))}
    </td>
    <td>
      {zone.application?.map(application => (
        <div key={application.id}>{application.name}</div>
      ))}
    </td>
    
                    <td>
                     {zone.scenariosNb}                   </td>
                    
                    <td>
                      <Dropdown isOpen={dropdownOpen[index]} toggle={() => toggleDropdown(index)}>
                        <DropdownToggle color="white">
                          <FontAwesomeIcon icon={faEllipsisV} />
                        </DropdownToggle>
                        <DropdownMenu right>
                        <DropdownItem header>Actions</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem>Sites</DropdownItem>
                          <DropdownItem>Efficiency</DropdownItem>
                          <DropdownItem>see more</DropdownItem>
                          
                        </DropdownMenu>
                      </Dropdown>
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
    </div>
  );
}
