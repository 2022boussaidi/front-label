import axios from "axios";
import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddTask() {
  let navigate = useNavigate();

  const [task, setTask] = useState({
    name: "",
    description: "",
    deadline: "",
   
    project:"",
    assignee:""
   
  });

  const { name, description, deadline,project, assignee } = task;
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]); // Store the list of projects here

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
  useEffect(() => {
    // Fetch the list of projects when the component mounts
    axios.get("http://localhost:8080/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching userss:", error);
      });
  }, []);

  const onInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/tasks", task);
    navigate("/projects");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add task</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                description
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter task description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="deadline" className="form-label">
                deadline
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter task deadline"
                name="deadline"
                value={deadline}
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
            <div className="mb-3">
            <label htmlFor="assignee" className="form-label">
          Member
        </label>
        <select
          className="form-select"
          name="assignee"
          value={assignee}
          onChange={(e) => onInputChange(e)}
        >
          <option value="">Select a member</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/overview">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
