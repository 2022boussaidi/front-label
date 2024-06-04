import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { Card, CardBody, Form, FormGroup, Label, Input } from "reactstrap";

function CreditUsage() {
  const [metrics, setMetrics] = useState([]);
  const [startDate, setStartDate] = useState(getDefaultStartDate());
  const [endDate, setEndDate] = useState(getDefaultEndDate());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMetrics();
  }, [startDate, endDate]);

  const fetchMetrics = async () => {
    try {
      const response = await axios.get('http://localhost:4000/cloudwatch/credit_usage', {
        params: {
          startTime: formatDateToUTC(startDate),
          endTime: formatDateToUTC(endDate)
        }
      });
      setMetrics(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setError('Error fetching data');
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  function getDefaultStartDate() {
    const today = new Date();
    const defaultStartDate = new Date(today);
    defaultStartDate.setDate(today.getDate() - 7);
    return defaultStartDate.toISOString().slice(0, 19);
  }

  function getDefaultEndDate() {
    const today = new Date();
    return today.toISOString().slice(0, 19);
  }

  function formatDateToUTC(date) {
    const utcDate = new Date(date);
    return utcDate.toISOString().replace('.000', '');
  }

  const formatYAxis = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)} MB`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} KB`;
    }
    return `${value} Bytes`;
  };

  const options = {
    chart: {
      type: 'line',
      height: 400,
    },
    xaxis: {
      categories: metrics.map(metric => metric.Timestamp),
    },
    yaxis: {
      labels: {
        formatter: formatYAxis,
      },
      title: {
        text: 'Bytes',
        rotate: -90,
        offsetX: -10,
        offsetY: -15,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          fontFamily: 'Arial',
        }
      }
    },
    tooltip: {
      shared: true
    },
    legend: {
      position: 'top'
    },
    colors: ['#007bff', '#dc3545', '#fd7e14'] // Change colors here
  };

  const series = [
    {
      name: 'Average',
      data: metrics.map(metric => metric.Average),
    },
    {
      name: 'Maximum',
      data: metrics.map(metric => metric.Maximum),
    },
    {
      name: 'Minimum',
      data: metrics.map(metric => metric.Minimum),
    }
  ];

  return (
    <div>
      <Card>
        <CardBody>
          <h5>CPU_Credit_usage</h5>
          <Form>
            <FormGroup className="mb-3">
              <Label for="from" className="me-2">From:</Label>
              <Input
                type="datetime-local"
                className="form-control"
                id="from"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for="to" className="me-2">To:</Label>
              <Input
                type="datetime-local"
                className="form-control"
                id="to"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </FormGroup>
          </Form>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Chart options={options} series={series} type="line" height={400} />
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default CreditUsage;
