import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditProject() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const { name, description, startDate,endDate} = project;

  const onInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProject();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/projects/${id}`, project);
    navigate("/overview");
  };

  const loadProject = async () => {
    const result = await axios.get(`http://localhost:8080/projects/${id}`);
    setProject(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Project</h2>

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
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startdate" className="form-label">
                Start Date
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="startDate"
                value={startDate}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="enddate" className="form-label">
                End Date
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your Team Id"
                name="endDate"
                value={endDate}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary"  >
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to={"/overview"}>
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
