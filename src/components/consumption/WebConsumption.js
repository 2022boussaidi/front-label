import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { Card, CardBody } from 'reactstrap';

const WebConsumption = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.get(
        "http://localhost:8080/consumption",
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      const apiData = response.data.consumption.find(series => series.name === "WEB");
      if (apiData) {
        const formattedData = apiData.data.map(item => ({ x: item.x, y: item.y }));
        setData(formattedData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const options = {
    chart: {
      type: 'area',
      height: 300,
    },
    xaxis: {
      type: 'category',
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value;
        }
      }
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
    legend: {
      position: 'top',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 2,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          {
            offset: 0,
            color: '#F1C40F ',
            opacity: 0.5
          },
          {
            offset: 100,
            color: '#F1C40F ',
            opacity: 0.9
          }
        ]
      },
    },
    stroke: {
      curve: 'smooth',
      width: 4,
      colors: ['#F1C40F ']
    }
  };

  const series = [{
    name: 'WEB',
    data: data.map(item => ({ x: item.x, y: item.y }))
  }];

  return (
    <div>
      <Card>
        <CardBody>
        <h5>Web Consumption</h5>
          <Chart options={options} series={series} type="area" height={300} width={600} />
        </CardBody>
      </Card>
    </div>
  );
};

export default WebConsumption;
