import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Card, CardBody, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlertError = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/error");
      const apiData = response.data;
      if (apiData) {
        const parsedData = parseData(apiData);
        setData(parsedData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

 const parseData = (apiData) => {
    const buckets = apiData.aggregations['2'].buckets;
    const parsedData = buckets.flatMap(bucket => {
      const robotBuckets = bucket['3'].buckets;
      return robotBuckets.flatMap(robotBucket => {
        const severityBuckets = robotBucket['4'].buckets;
        return severityBuckets.map(severityBucket => ({
          Ekara_Site_Agent: bucket.key,
          Ekara_Robot: robotBucket.key,
          Robot_Severity: severityBucket.key,
          Count: severityBucket.doc_count // Add count from API response
        }));
      });
    });

    return parsedData;
  };

  const handleClick = (page, event) => {
    event.preventDefault();
    setCurrentPage(page);
  };

   // Change page
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Function to send toast notification
  const sendNotification = (robotName) => {
    toast.error(`Error detected in robot: ${robotName}`, {
     
      autoClose: 3000, // Close the toast after 3 seconds
    });
  };

  // Check for errors or warnings above a certain threshold and trigger notifications
  useEffect(() => {
    currentData.forEach(item => {
      if (item.Count > 50) {
        sendNotification(item.Ekara_Robot);
      }
    });
  }, [currentData]);

  return (
    <div>
      <Card>
        <CardBody>
          <h4>Ekara_Robot_Top_Error_Count</h4>
          <Table bordered>
            <thead>
              <tr>
                <th>Ekara_Site_Agent</th>
                <th>Ekara_Robot</th>
                <th>Robot_Severity</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index}>
                  <td>{item.Ekara_Site_Agent}</td>
                  <td>{item.Ekara_Robot}</td>
                  <td>{item.Robot_Severity}</td>
                  <td>{item.Count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {/* Pagination code here */}
          </Pagination>
        </CardBody>
      </Card>
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default AlertError;
