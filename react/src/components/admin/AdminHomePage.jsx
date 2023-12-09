import React from "react";
import SideNav from "./SideNav";

function AdminHomePage() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideNav />
        <div>
          <h1>Admin Home Page</h1>
          {/* Add other content here */}
        </div>
      </div>
    </>
  );
}

export default AdminHomePage;
