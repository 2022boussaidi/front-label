import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';

const parseErrorData = (data) => {
  return data.aggregations["2"].buckets.map(bucket => {
    const warnBucket = bucket["3"].buckets.find(b => b.key === "WARN");
    const errBucket = bucket["3"].buckets.find(b => b.key === "ERR");

    return {
      timestamp: bucket.key_as_string,
      WARN: warnBucket ? warnBucket.doc_count : 0,
      ERR: errBucket ? errBucket.doc_count : 0
    };
  });
};

const ErrorLineChart = () => {
  const [errorData, setErrorData] = useState({ series: [], categories: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5001/api/error_by_time');
        const parsedData = parseErrorData(response.data);

        const series = [
          {
            name: 'WARN',
            data: parsedData.map(item => item.WARN)
          },
          {
            name: 'ERR',
            data: parsedData.map(item => item.ERR)
          }
        ];
        const categories = parsedData.map(item => item.timestamp);

        setErrorData({ series, categories });
      } catch (error) {
        console.error('Error fetching error data:', error);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    chart: {
      type: 'line',
      height: 350,
    },
    title: {
      text: 'Ekara_Node_Robot_Error_by_Time',
      align: 'left'
    },
    xaxis: {
      categories: errorData.categories,
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: 'Count'
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center'
    },
    colors: ['#8884d8', '#82ca9d']
  };

  return (
    <Card>
      <CardBody>
        <h4>Ekara_Node_Robot_Error_by_Time</h4>
        <Chart
          options={chartOptions}
          series={errorData.series}
          type="line"
          height={400}
        />
      </CardBody>
    </Card>
  );
};

export default ErrorLineChart;
