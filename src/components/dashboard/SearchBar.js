import React, { useState } from "react";
import { InputGroup, Input, InputGroupAddon, Button, InputGroupText } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Searchbar.css"; // Import custom styles for the search bar

const SearchBar = ({ onSearch }) => {
 

  

  
  return (
    <InputGroup className="search-bar">
      <Input
        className="search-input"
        placeholder="Search..."
        
      />
      <InputGroupText addonType="append">
        <Button className="search-button" >
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </InputGroupText>
    </InputGroup>
  );
};

export default SearchBar;
