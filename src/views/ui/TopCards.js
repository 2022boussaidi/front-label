import React from "react";
import { Card, CardBody } from "reactstrap";

const TopCards = (props) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-center">
          <div className={`circle-box lg-box d-inline-block ${props.bg}`}>
            <i className={props.icon}></i>
          </div>
          <div className="ms-3">
            <h3 className="mb-0 font-weight-bold">{props.earning}</h3>
            <small className="text-muted">{props.subtitle}</small>
          </div>
          <div className="ms-3">
  {(props.details || []).map((detail, index) => (
    <div key={index}>
      <small>{detail}</small>
      {index !== props.details.length - 1 && <br />} {/* Add a line break if it's not the last detail */}
    </div>
  ))}
</div>


        </div>
        {props.children} {/* Render children (buttons) */}
      </CardBody>
    </Card>
  );
};

export default TopCards;
