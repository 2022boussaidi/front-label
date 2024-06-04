import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import { useState } from "react";

const tableData = [
  {
    avatar: user1,
    name: "member",
    email: "hgover@gmail.com",
  },
  {
    avatar: user2,
    name: "member",
    email: "hgover@gmail.com",
  },
  {
    avatar: user3,
    name: "member",
    email: "hgover@gmail.com",
  },
  {
    avatar: user4,
    name: "member",
    email: "hgover@gmail.com",
  },
  {
    avatar: user5,
    name: "member",
    email: "hgover@gmail.com",
  },
];

const TeamManagement = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleMembers = showAll ? tableData : tableData.slice(0, 3);

  const handleSeeMore = () => {
    setShowAll(true);
  };

  return (
    <div>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-end">
            {!showAll && (
              <button className="btn btn-link" onClick={handleSeeMore}>
                See More
              </button>
            )}
          </div>
          <CardTitle tag="h5">Members Listing</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the members
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Member</th>
              </tr>
            </thead>
            <tbody>
              {visibleMembers.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="mt-3">
        <button className="btn btn-primary">Add member</button>
      </div>
        </CardBody>
      </Card>
      
    </div>
  );
};

export default TeamManagement;
