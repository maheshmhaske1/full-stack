import React, { useState } from "react";
import { Sidenav, Nav, Toggle } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import UserBadgeIcon from "@rsuite/icons/UserBadge";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import PeoplesMapIcon from "@rsuite/icons/PeoplesMap";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import PhoneFillIcon from "@rsuite/icons/PhoneFill";
import NumbersIcon from "@rsuite/icons/Numbers";
import GridIcon from "@rsuite/icons/Grid";
import "rsuite/dist/rsuite.min.css";
import "./css/sideNav.css";
import { Link, useNavigate } from "react-router-dom";

function SideNav() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState("1");

  return (
    <div style={{ width: 240 }} className="p-2 sideNav">
      <div class="form-check form-switch"></div>
      {/* <Toggle
        onChange={setExpanded}
        checked={expanded}
        checkedChildren="Expand"
        unCheckedChildren="Collapse"
      /> */}
      <hr />
      <Sidenav expanded={expanded} defaultOpenKeys={["3", "4"]}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Menu
              placement="rightStart"
              eventKey="2"
              title="Analysis"
              icon={<DashboardIcon />}
            >
              <Nav.Item eventKey="1" icon={<PeoplesMapIcon />}>
                <Link
                  to="/admin/analysis/users"
                  style={{ textDecoration: "none" }}
                >
                  Users
                </Link>
              </Nav.Item>
              <Nav.Item eventKey="1" icon={<NumbersIcon />}>
                <Link
                  to="/admin/analysis/products"
                  style={{ textDecoration: "none" }}
                >
                  Product
                </Link>
              </Nav.Item>
              <Nav.Item eventKey="1" icon={<NumbersIcon />}>
                <Link
                  to="/admin/analysis/revenue"
                  style={{ textDecoration: "none" }}
                >
                  Revenue
                </Link>
              </Nav.Item>
            </Nav.Menu>

            <Nav.Menu
              placement="rightStart"
              eventKey="3"
              title="Management"
              icon={<MagicIcon />}
            >
              <Nav.Item eventKey="3-2" icon={<UserBadgeIcon />}>
                <Link
                  to="/admin/manage/users"
                  style={{ textDecoration: "none" }}
                >
                  Manage Users
                </Link>
              </Nav.Item>
              <Nav.Item eventKey="3-2">
                <Link
                  to="/admin/manage/products"
                  style={{ textDecoration: "none" }}
                >
                  Manage Product
                </Link>
              </Nav.Item>
            </Nav.Menu>

            <Nav.Menu
              placement="rightStart"
              eventKey="4"
              title="Support"
              icon={<PhoneFillIcon />}
            >
              <Nav.Item eventKey="3-2">
                <Link
                  to="/admin/manage/tickets"
                  style={{ textDecoration: "none" }}
                >
                  Tickets
                </Link>
              </Nav.Item>
              <Nav.Item eventKey="3-2">
                <Link to="/admin/manage/faq" style={{ textDecoration: "none" }}>
                  FAQ
                </Link>
              </Nav.Item>
            </Nav.Menu>

            <Nav.Menu
              placement="rightStart"
              eventKey="4"
              title="Settings"
              icon={<GearCircleIcon />}
            >
              <Nav.Item
                eventKey="4-1"
                onClick={() => {
                  localStorage.clear("token");
                  localStorage.clear("isAdmin");
                  navigate("/login");
                }}
              >
                Logout
              </Nav.Item>
            </Nav.Menu>

          </Nav>
        </Sidenav.Body>
        {/* <Sidenav.Toggle
          expanded={expanded}
          onToggle={(expanded) => setExpanded(expanded)}
        /> */}
      </Sidenav>
    </div>
  );
}

export default SideNav;
