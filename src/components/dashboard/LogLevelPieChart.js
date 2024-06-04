import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { Card, CardBody } from 'reactstrap';

const LogLevelPieChart = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/count_logs");
      const apiData = response.data;
      if (apiData) {
        const parsedData = parseData(apiData);
        setData(parsedData.map(item => item.value));
        setLabels(parsedData.map(item => item.name));
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const parseData = (apiData) => {
    const buckets = apiData.aggregations["2"].buckets;
    return buckets.map(bucket => ({
      name: bucket.key,
      value: bucket.doc_count
    }));
  };

  const chartOptions = {
    chart: {
      type: 'pie'
    },
    labels: labels,
    colors: ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    legend: {
      position: 'top',
      horizontalAlign: 'center'
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}`
      }
    }
  };

  return (
    <div>
      <Card>
        <CardBody>
          <h4>Log-level Pie Chart</h4>
          <Chart
            options={chartOptions}
            series={data}
            type="pie"
            width="100%"
            height={400}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default LogLevelPieChart;
