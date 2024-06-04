import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditEvent() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [event, setEvent] = useState({
    title: "",
    start: "",
    end: "",
   
  });

  const { title,start,end } = event;

  const onInputChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

 
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/events/${id}`, event);
    navigate("/events");
  };

 
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Event</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor=" Event title" className="form-label">
               Event title
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the event title"
                name="title"
                value={title}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Start date" className="form-label">
                Start date
              </label>
              <input
                type={"datetime-local"}
                className="form-control"
                placeholder="Enter start date"
                name="start"
                value={start}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="End date" className="form-label">
                End date
              </label>
              <input
                type={"datetime-local"}
                className="form-control"
                placeholder="Enter end date"
                name="end"
                value={end}
                onChange={(e) => onInputChange(e)}
              />
            </div>
           
           
           
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/events">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
