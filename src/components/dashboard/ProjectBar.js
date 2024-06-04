import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectPerformanceChart from "./ProjectPerformanceChart"

export default function ProjectBar() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const result = await axios.get("http://localhost:8080/projects");
    setProjects(result.data);
  };

  return (
    <div className="container">
      <h1>Project Performance</h1>
      <ProjectPerformanceChart projects={projects} />
    </div>
  );
}
