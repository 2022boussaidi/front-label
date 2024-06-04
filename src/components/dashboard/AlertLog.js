import React, { useState, useEffect } from 'react';
import { Alert, Card, CardBody, Table } from 'reactstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';

const AlertLog = () => {
  const [alerts, setAlerts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const alertsPerPage = 20; // Change this value to adjust the number of alerts per page
  const pagesVisited = pageNumber * alertsPerPage;

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/alerts/log-alert');
        setAlerts(response.data.alerts);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, []);

  const displayAlerts = alerts
    .slice(pagesVisited, pagesVisited + alertsPerPage)
    .map((alert, index) => {
      // Extracting severity and message from the alert string
      const [severity, message] = alert.split(' - ');
      // Checking if severity is WARN or ERR
      let severityClass = '';
      if (severity === 'Alert: WARN') {
        severityClass = 'badge bg-warning '; // Add class for warning severity
      } else if (severity === 'Alert: ERR') {
        severityClass = 'badge bg-danger'; // Add class for error severity
      }
      return (
        <tr key={index}>
          <td className={severityClass}>{severity}</td>
          <td>{message}</td>
        </tr>
      );
    });

  const pageCount = Math.ceil(alerts.length / alertsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <Card>
        <CardBody>
          <h5>
            <FontAwesomeIcon icon={faExclamationTriangle} /> Alert Logs
          </h5>
          <Table   striped hover >
            <thead>
              <tr>
                <th scope="row">Severity</th>
                <th scope="row">Message</th>
              </tr>
            </thead>
            <tbody>{displayAlerts}</tbody>
          </Table>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={'pagination'}
            previousLinkClassName={'pagination__link'}
            nextLinkClassName={'pagination__link'}
            disabledClassName={'pagination__link--disabled'}
            activeClassName={'pagination__link--active'}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default AlertLog;
