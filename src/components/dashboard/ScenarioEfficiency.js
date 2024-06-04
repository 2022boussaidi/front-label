import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { Card, CardBody } from "reactstrap";

export default function PScenarioEfficiency() {
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/scenarios",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setScenarios(response.data);
    } catch (error) {
      console.error("Error loading scenarios:", error);
    }
  };

  let data = [];

  if (scenarios.length > 0) {
    const totalScenarios = scenarios.length;
    let totalMinPerformance = 0;
    let totalMaxPerformance = 0;
    let totalMinAvailability = 0;
    let totalMaxAvailability = 0;

    scenarios.forEach((scenario) => {
      totalMinPerformance += scenario.slaThreshold.performance.min;
      totalMaxPerformance += scenario.slaThreshold.performance.max;
      totalMinAvailability += scenario.slaThreshold.availability.min;
      totalMaxAvailability += scenario.slaThreshold.availability.max;
    });

    const globalMinPerformance = totalMinPerformance / totalScenarios;
    const globalMaxPerformance = totalMaxPerformance / totalScenarios;
    const globalMinAvailability = totalMinAvailability / totalScenarios;
    const globalMaxAvailability = totalMaxAvailability / totalScenarios;

    data = [
      { x: 'globalMinPerformance', y: globalMinPerformance },
      { x: 'globalMaxPerformance', y: globalMaxPerformance },
      { x: 'globalMinAvailability', y: globalMinAvailability },
      { x: 'globalMaxAvailability', y: globalMaxAvailability },
    ];
  }

  const options = {
    chart: {
      type: 'pie',
      height: 400,
    },
    labels: data.map(item => item.x),
    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    legend: {
      position: 'top',
    },
  };

  return (
    <div>
      <Card>
        <CardBody>
          <h5>Global Performance and Availability</h5>
          <Chart options={options} series={data.map(item => item.y)} type="pie" height={400} />
        </CardBody>
      </Card>
    </div>
  );
}
