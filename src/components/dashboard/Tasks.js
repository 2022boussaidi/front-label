import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import "./card.css"; // Import your CSS file

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const result = await axios.get("http://localhost:8080/tasks");
    console.log(result.data);
    setTasks(result.data);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8080/tasks/${id}`);
    loadTasks();
  };

  // Group tasks by project
  const tasksByProject = tasks.reduce((acc, task) => {
    const projectId = task.project.id;
    if (!acc[projectId]) {
      acc[projectId] = {
        project: task.project,
        tasks: []
      };
    }
    acc[projectId].tasks.push(task);
    return acc;
  }, {});

  return (
    <div className="container" >
      <Card  >
        <CardBody >
          <CardTitle tag="h5">Tasks Listing</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Tasks by Project
          </CardSubtitle>
          <div className="py-4">
            {Object.values(tasksByProject).map((projectData, index) => (
              <div key={index} className="mb-4">
                <h5 className="mb-3 text-gray">
                  Project name: {projectData.project.name}
                </h5>
                <div className="row" style={{marginRight:"450px"}}>
                  {projectData.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="col-md-4 mb-3" >
                      <Card className="gray-card small-card"style={{marginBottom:"20px"}}> 
                        <CardBody >
                          <h6 className="card-title">{task.name}</h6>
                          <p className="card-text">{task.description}</p>
                          <Button
                            color="primary"
                            className="mr-2"
                            tag={Link}
                            to={`/viewtask/${task.id}`}
                          >
                            View
                          </Button>
                          <Button
                            color="outline-primary"
                            className="mr-2"
                            tag={Link}
                            to={`/edittask/${task.id}`}
                          >
                            Edit
                          </Button>
                          <Button
                            color="danger"
                            onClick={() => deleteTask(task.id)}
                          >
                            Delete
                          </Button>
                        </CardBody>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Link className="btn btn-outline-primary mx-2" to="/addtask">
            Add Task
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
