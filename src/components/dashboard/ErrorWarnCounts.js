import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

function ErrorWarnCounts() {
  const [warnPredictions, setWarnPredictions] = useState([]);
  const [errPredictions, setErrPredictions] = useState([]);

  useEffect(() => {
    // Fetch predictions from both WARN and ERR endpoints
    fetch('http://localhost:5000/predict-count?log_level=WARN&steps=7')
      .then(response => response.json())
      .then(data => setWarnPredictions(data))
      .catch(error => console.error('Error fetching WARN predictions:', error));

    fetch('http://localhost:5000/predict-count?log_level=ERR&steps=7')
      .then(response => response.json())
      .then(data => setErrPredictions(data))
      .catch(error => console.error('Error fetching ERR predictions:', error));
  }, []);

  // Get the current date
  const currentDate = new Date().toLocaleDateString();

  // Extract predicted counts from predictions arrays
  const warnPredictedCounts = warnPredictions.map(prediction => prediction.predict);
  const errPredictedCounts = errPredictions.map(prediction => prediction.predict);
  const labels = Array.from({ length: warnPredictions.length }, (_, i) => i + 1);

  // ApexCharts configuration
  const chartOptions = {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: false
      }
    },
    xaxis: {
      categories: labels,
      title: {
        text: 'Days'
      }
    },
    yaxis: {
      title: {
        text: 'Predicted Counts'
      }
    },
    legend: {
      position: 'top'
    }
  };

  const series = [
    {
      name: 'WARN',
      data: warnPredictedCounts
    },
    {
      name: 'ERR',
      data: errPredictedCounts
    }
  ];

  return (
    <div>
      <Row >
        <Col>
          <Card>
            <CardBody>
              <h4>Error_Warn_Counts</h4>
              <p className="mb-4 text-muted">This chart displays the predicted counts of ERR and WARN log levels for the next 7 days starting from {currentDate}.</p>
              <Chart options={chartOptions} series={series} type="line" height={350} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ErrorWarnCounts;
