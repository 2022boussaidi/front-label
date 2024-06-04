// ContactCard.js
import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const ContactCard = () => {
  const contactEmail = "contact@xxxxxxxx";

  return (
    <Card>
      <CardBody>
        <CardTitle>Contact Us</CardTitle>
        <CardText>
          If you have any questions or inquiries, please feel free to contact us
          at{" "}
          <a href={`mailto:${contactEmail}`} className="text-primary">
            {contactEmail}
          </a>
          .
        </CardText>
      </CardBody>
    </Card>
  );
};

export default ContactCard;
