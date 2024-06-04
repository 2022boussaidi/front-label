import React, { useState } from "react";

import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";


const navigation = [
  {
    title: "Inventory",
    href: "/inventory",
    icon: "bi bi-grid-fill",
   
  },
     
    {
      
     
        title: "Sites",
        href: "/sites",
        icon: "bi bi-newspaper",
      },
      {
        title: "Robots  ",
        href: "/robots",
        icon: "bi bi-robot",
        items: [
          { title: "Logs", href: "/logs" , icon: "bi bi-clipboard-pulse ms-3" },
          { title: "Error Summary", href: "/errors" , icon: "bi bi-exclamation-triangle-fill ms-3" },
          { title: "Last measures", href: "/last_measures" , icon: "bi bi-bar-chart-line-fill ms-3" },

          
        ],
      },
      {
        title: "Workers  ",
        href: "/queues",
        icon: "bi bi-layout-text-sidebar-reverse",
        items: [
          { title: "Scenarios", href: "/scenarios" , icon: "bi bi-stack ms-3"},
          { title: "Zones", href: "/zones" , icon: "bi bi-pin-map ms-3"},
        ],
      },
    
   
   
     
      {
        title: " Analytics",
      
        icon: "bi bi-grid-3x2-gap",
        items: [
          { title: "Instance metrics",   href: "/analytics", icon: "bi bi-pie-chart-fill ms-3" },
          { title: "Consumption ",   href: "/consumption", icon: "bi bi-graph-up ms-3" },

        
        ]
      },
      {
        title: "Dive deeper",
        icon: "bi bi-zoom-in",
        items: [
          { title: "worspaces", href: "/workspaces", icon: "bi bi-building-fill ms-3" },
          { title: "users", href: "/users" , icon: "bi bi-person-lines-fill ms-3"},
          { title: "clients", href: "/clients", icon: "bi bi-people-fill ms-3" },
          
        ],
      },

      {
        title: " Forecasting Hub",
        href: "/prediction",
        icon: "bi bi-pie-chart-fill",
      },
  

  {
    
  
        title: "Alerts ",
        href: "/alerts",
        icon: "bi bi-patch-exclamation-fill",
      },
  
    

      
      {
        title: "Log out ",
        href: "/",
        icon: "bi bi-box-arrow-in-right",
      },
  
  
];
const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
      <Nav vertical className="sidebarNav">
  {navigation.map((navi, index) => (
    <NavItem key={index}>
      <Link
        to={navi.href}
        className={
          location.pathname === navi.href
            ? "text-warning nav-link py-3 "
            : "nav-link text-white py-3"
        }
      >
        <i className={navi.icon}></i>
        <span className="ms-3 d-inline-block">{navi.title}</span>
      </Link>
      {navi.items && navi.items.length > 0 && (
        <Nav vertical className="ml-4">
          {navi.items.map((item, subIndex) => (
            <NavItem key={subIndex}  className="sidenav-bg">
              <Link
                to={item.href}
                className={
                  location.pathname === item.href
                    ? "text-warning nav-link py-1 "
                    : "nav-link text-white py-1"
                }
              >
                 <i className={item.icon}></i>
                <span className="ms-3 d-inline-block">{item.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      )}
    </NavItem>
  ))}
  <Button
    color="warning"
    tag="a"
    target="_blank"
    className="mt-3"
    href="https://www.ip-label.fr"
  >
    Know more
  </Button>
</Nav>
      </div>
    </div>
  );
};

export default Sidebar;
