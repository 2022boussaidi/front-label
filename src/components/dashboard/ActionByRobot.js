import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Pagination, PaginationItem, PaginationLink, Card, CardBody } from 'reactstrap';

const ActionByRobotTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5001/api/action_by_robot');
        setData(response.data.hits.hits);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
        <Card> 
            <CardBody>
            <h4> Action by robot SA  </h4>
      <Table striped>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Hostname</th>
            <th>DFY_Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.fields['@timestamp']}</td>
              <td>{item.fields['host.hostname']}</td>
              <td>{item.fields['DFY_Action.keyword']}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink previous onClick={() => paginate(currentPage - 1)} />
        </PaginationItem>
        <PaginationItem disabled={currentItems.length < itemsPerPage}>
          <PaginationLink next onClick={() => paginate(currentPage + 1)} />
        </PaginationItem>
      </Pagination>
      </CardBody>
      </Card>
    </div>
  );
};

export default ActionByRobotTable;
