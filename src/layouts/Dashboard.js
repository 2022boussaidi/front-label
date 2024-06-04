import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";

const Dashboard = () => {
  return (
    <main>
      <div className="pageWrapper">
        {/********Header**********/}
        <Header />
        
        {/********Sidebar and Content Area under Header**********/}
        <div className="d-flex">
          {/********Sidebar**********/}
          <aside className="sidebarArea shadow" id="sidebarArea">
            <Sidebar />
          </aside>
          
          {/********Content Area**********/}
          <div className="contentArea">
            <Container className="p-4 wrapper" fluid>
              <Outlet />
            </Container>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
