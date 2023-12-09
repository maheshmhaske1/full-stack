import React from "react";
import SideNav from "./SideNav";

function AdminDashboard() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideNav />
        <div>
          <h1>Admin Dashboard Page</h1>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
