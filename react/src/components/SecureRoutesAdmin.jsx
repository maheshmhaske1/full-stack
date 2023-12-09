import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SecureRoutesAdmin(props) {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isLoggedIn || isAdmin  !== "true") {
      navigate("/login");
    }
  });

  return (
    <>
      <Component />
    </>
  );
}

export default SecureRoutesAdmin;
