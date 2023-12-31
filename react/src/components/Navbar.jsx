import React, { useState } from "react";
import "./css/Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logOut } from "./HTTP/Api";
import { useEffect } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

function Navbar({ currentPath }) {
  const navigate = useNavigate();
  const [urlPath, setUrlPath] = useState("");

  useEffect(() => {
    setUrlPath(currentPath);
  }, [urlPath]);

  const handleLogout = async () => {
    localStorage.removeItem("isLoggedIn"); // Clear the isLoggedIn key from localStorage
    navigate("/");
  };
  return (
    <>
      <div className="footer-container">
        <nav
          className="navbar navbar-expand-lg bg-body-white p-3 shadow-sm"
          id="nav"
        >
          <div className="container-fluid" id="nav-container">
            <Link className="navbar-brand" to="/" id="brand-name">
              Flipkart
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto">
               
              </ul>
              <form className="d-flex" role="search">
              <InputGroup size="lg" width="100" mr="2"> {/* Add margin-right */}
                  <Input 
                  focusBorderColor='pink.300'
                  pr="4.5rem"
                   placeholder="Search Products etc..." />
                  <InputRightElement>
                    <button
                      className="btn btn-lg text-white font-bold"
                      id="btn-signin"
                    >
                      <i className="bi bi-search"></i>
                    </button>
                  </InputRightElement>
                </InputGroup>

                <button
                  className="btn btn-lg text-white font-bold ml-4"
                  id="btn-signin"
                >
                  Sign In
                </button>
              
              </form>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
