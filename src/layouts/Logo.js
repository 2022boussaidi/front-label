
import { Link } from "react-router-dom";
import React from "react";
import logo from "../assets/images/logos/ekara.png";

const Logo = () => {
  return (
    <Link to="/">
     <div>
    <img src={logo} alt="Logo" style={{ width: '120px', height: 'auto' }} />
  </div>
    </Link>
  );
};

export default Logo;
