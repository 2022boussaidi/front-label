import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const TotalLog = () => {
  const [totalLogs, setTotalLogs] = useState(0);

  useEffect(() => {
    const fetchTotalLogs = async () => {
      try {
        const response = await axios.post('http://localhost:5001/api/total_logs');
        const total = response.data.hits.total.value;
        setTotalLogs(total);
      } catch (error) {
        console.error('Error fetching total logs:', error);
      }
    };

    fetchTotalLogs();
  }, []);

  return (
    <Card className="mb-3">
      <CardBody >
        <h4 >Total Logs</h4>
        <CardText className="d-flex flex-column align-items-center"  style={{ fontSize: '50px', fontWeight: 'bold' }}>
          <strong></strong> {totalLogs}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default TotalLog ; 
