import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewTeam() {
  const [team, setTeam] = useState({
    name: "",
    project: "",
    members: [],
  });

  const { id } = useParams();

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    const result = await axios.get(`http://localhost:8080/teams/${id}`);
    setTeam(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Team Details</h2>

          <div className="card">
            <div className="card-header">
              Details of team id : {team.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {team.name}
                </li>
                <li className="list-group-item">
                  <b>Project name:</b>
                  {team.project.name}
                </li>
                <li className="list-group-item">
                  <b>Members:</b>
                       <ul> {team.members.map((member) => (
                          <li key={member.id}>{member.name}</li>
                        ))}
                      </ul>
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
