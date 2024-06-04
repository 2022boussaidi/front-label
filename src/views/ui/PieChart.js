import { Card, CardBody, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import axios from "axios";

const PieChart = () => {
  const [tasks, setTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [unassignedCount, setUnassignedCount] = useState(0);
  const [uncompletedCount, setUncompletedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);
  const loadProjects = async () => {
    try {
      const [ tasksResponse,completedCountResponse, unassignedCountResponse, uncompletedCountResponse] = await Promise.all([
        axios.get("http://localhost:8080/tasks"),
        axios.get("http://localhost:8080/tasks/completed-count"),
        axios.get("http://localhost:8080/tasks/unassigned-count"),
        axios.get("http://localhost:8080/tasks/uncompleted-count"),
      ]);
      const tasksData = tasksResponse.data;
      const completedCount = completedCountResponse.data;
      const unassignedCount = unassignedCountResponse.data;
      const uncompletedCount = uncompletedCountResponse.data;

      setTasks(tasksData);
      setCompletedCount(completedCount);
      setUnassignedCount(unassignedCount);
      setUncompletedCount(uncompletedCount);
  
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  

  const chartoptions = {
    series: [completedCount, unassignedCount, uncompletedCount],
    options: {
      chart: {
        type: "pie",
      },
      labels: ["Completed tasks", "Unassigned tasks", "Uncompleted tasks"], // Labels for each data point
    },
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Task tracker</CardTitle>
        <Chart
          type="pie"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
          
        />
      </CardBody>
    </Card>
  );
};

export default PieChart;
