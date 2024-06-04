import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewProject() {
  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    tasks : [],
   
  });

  const { id } = useParams();

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    const result = await axios.get(`http://localhost:8080/projects/${id}`);
    setProject(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of project id : {project.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {project.name}
                </li>
                <li className="list-group-item">
                  <b>Description:</b>
                  {project.description}
                </li>
                <li className="list-group-item">
                  <b>Start Date:</b>
                  {project.startDate}
                </li>
                <li className="list-group-item">
                  <b>End Date:</b>
                  {project.endDate}
                </li>
                
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/overview"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
