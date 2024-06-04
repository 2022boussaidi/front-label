import { Card, CardBody, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SalesChart = () => {


  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state
  useEffect(() => {
    loadRobots();
  }, []);

  const loadRobots = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/callrobots",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setRobots(response.data.robots);
      setLoading(false); // Set loading to false when data is available
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  };
     // Render a loading indicator while data is being fetched
  if (loading) {
    return <p>Loading robot data...</p>;
  }

  // Check if projects is empty
  if (robots.length === 0) {
    return <p>No robot data available.</p>;
  }

  // Extract project names, performance scores, and progress percentages
  const robotsNames = robots.map((robot) => robot.name);
  const Status = robots.map((robot) =>robot.hbStatus);
  const Storage_name= robots.map((robot) => robot.storageName);

  const chartoptions = {
    series: [
      {
        name: "Status",
        data: Status,
      },
      {
        name: "Storage name",
        data: Storage_name

      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
         categories: robotsNames,
      },
    },
  };
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Robot deatils</CardTitle>
        
        <Chart
          type="area"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default SalesChart;
