import axios from "axios";

import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddTeam() {
  let navigate = useNavigate();
  const [team, setTeam] = useState({
    name: "",
    project:";"
  });

  const [projects, setProjects] = useState([]);
  

  useEffect(() => {
    // Fetch the list of projects when the component mounts
    axios.get("http://localhost:8080/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  const { name,project} = team;
  const onInputChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
};
    const onSubmit =async (e) => {
     e.preventDefault();
    await axios.post("http://localhost:8080/teams",team);
    navigate("/");
    };
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Team</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Team Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter TeamName"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
            <label htmlFor="project" className="form-label">
          Project
        </label>
        <select
          className="form-select"
          name="project"
          value={project}
          onChange={(e) => onInputChange(e)}
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
            </div>
         
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}