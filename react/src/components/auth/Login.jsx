import React, { useEffect, useState, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { login } from "../HTTP/Api";
import CloudinaryWidget from "../admin/CloudinaryWidget ";

function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("Password");
  const fileInputRef = useRef(null);
  const [blogImg, setBlogImg] = useState("");
  const [foldepth, setFolderpth] = useState("");

  useEffect(() => {
    const isTokenPresent = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");

    let redirectUrl = ``;
    if (isAdmin) {
      redirectUrl = "/admin/analysis/users";
    }

    if (isTokenPresent) {
      navigate(redirectUrl);
    }
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      toast({
        description: "username & password are required fields.",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }

    const payload = { username, password };
    let isLoggedIn = await login(payload);
    isLoggedIn =="API FAILURE"&&
      toast({
        description: "something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });

    if (isLoggedIn.success == false) {
      toast({
        description: isLoggedIn.message,
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }

    if (isLoggedIn.success == true) {
      toast({
        description: isLoggedIn.message,
        status: "success",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      localStorage.setItem("token", isLoggedIn.token);
      localStorage.setItem("isAdmin", isLoggedIn.data.isAdmin);
      if (isLoggedIn.data.isAdmin == true) {
        navigate("/admin/analysis/users");
      } else {
        alert("user");
      }
    }
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <>
    {/* <CloudinaryWidget /> */}
      <div className="container-fluid">
        {/* ========= Login Component start ======== */}
        <div className="row justify-content-center">
          <div className="col-md-4 col-sm-8 col-11  auth-card align-item-center">
            <div className="card shadow ">
              <div className="card-header text-start">
                <h4>Login</h4>
              </div>
              <div className="card-body ">
                <form className="login-form">
                  <div className="form-group pt-2 ">
                    <input
                      className="form-control"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group pt-2">
                    <input
                      type={passwordInput}
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      onFocus={() => {
                        setPasswordInput("text");
                      }}
                      onBlur={() => {
                        setPasswordInput("password");
                      }}
                    />
                  </div>
                  <hr />
                  <button
                    className="btn login-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                  >
                    Login
                  </button>
                  <div className="mt-2">
                    Don't have an Account?
                    <Link to={"/auth"}>Sign-up</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* ========= Login Component end ======== */}
      </div>
    </>

  );
}

export default Login;