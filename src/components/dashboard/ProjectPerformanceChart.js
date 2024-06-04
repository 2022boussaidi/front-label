import Bar from "react-apexcharts";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectPerformanceChart = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const result = await axios.get("http://localhost:8080/projects");
      setProjects(result.data);
      setLoading(false); // Set loading to false when data is available
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  };

  // Render a loading indicator while data is being fetched
  if (loading) {
    return <p>Loading project data...</p>;
  }

  // Check if projects is empty
  if (projects.length === 0) {
    return <p>No project data available.</p>;
  }

  // Extract project names, performance scores, and progress percentages
  const projectNames = projects.map((project) => project.name);
  const performanceScores = projects.map((project) => project.performanceScore);
  const progressPercentages = projects.map((project) => project.progressPercentage);

  // Create the data for the chart
  const data = {
    labels: projectNames,
    datasets: [
      {
        label: "Performance Score",
        data: performanceScores,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Progress Percentage",
        data: progressPercentages,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Customize chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProjectPerformanceChart;
