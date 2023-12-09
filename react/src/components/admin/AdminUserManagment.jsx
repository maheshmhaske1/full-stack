import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import { useToast } from "@chakra-ui/react";
import "./css/adminUserManagement.css";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { Badge } from "@chakra-ui/react";
import { banUnbanUser, getAllUsers } from "../HTTP/Api";

function AdminUserManagment() {
  const toast = useToast();
  const [globalFilter, setGlobalFilter] = useState("");
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const totalUsers = await getAllUsers();
    if (totalUsers == "API FAILURE") {
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    } else {
      setUsers(totalUsers.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  const handleBanUnban = async (id, action) => {
    const isActionDone = await banUnbanUser({ id, action });

    if (isActionDone == "API FAILURE") {
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    } else if (isActionDone.status == true) {
      getUsers();
      toast({
        description: isActionDone.message,
        status: "success",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <div className="container-fluid cards">
        <div className="row justify-content-center">
          <div className="col-md-11 col-12 pb-4">
            <div className="card shadow">
              <div className="card-header text-start">
                <div>
                  <h4>User Management</h4>
                </div>
              </div>
              <div className="card-body">
                <div className="card">
                  <div className="row justify-content-center">
                    <div className="col-md-3">
                      <div className="text-start p-1">
                        <InputText
                          id="search-input"
                          value={globalFilter}
                          onChange={onGlobalFilterChange}
                          placeholder="Global Search"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text-center p-1">
                        <button className="btn refresh-btn" onClick={getUsers}>
                          Refresh
                        </button>
                      </div>
                    </div>
                    <div className="col-md-3"></div>
                  </div>
                  <div class="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Mobile</th>
                          <th scope="col">Admin</th>
                          <th scope="col">Banned</th>
                          <th scope="col">Created At</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, i) => {
                          return (
                            <tr key={user._id}>
                              <td>{i + 1}</td>
                              <td>
                                {user.useFirstName} {user.userLastName}
                              </td>
                              <td>{user.email}</td>
                              <td>{user.mobile}</td>
                              <td>
                                {user.isAdmin == true ? (
                                  <Badge fontSize="1.0em" colorScheme="red">
                                    YES
                                  </Badge>
                                ) : (
                                  <Badge fontSize="1.0em" colorScheme="purple">
                                    NO
                                  </Badge>
                                )}
                              </td>
                              <td>
                                {user.isBanned == true ? (
                                  <Badge fontSize="1.0em" colorScheme="red">
                                    YES
                                  </Badge>
                                ) : (
                                  <Badge fontSize="1.0em" colorScheme="purple">
                                    NO
                                  </Badge>
                                )}
                              </td>
                              <td>
                                <b>{user.createdAt.slice(0, 10)}</b>{" "}
                              </td>
                              <td>
                                {user.isBanned == true ? (
                                  <button
                                    className="btn btn-sm refresh-btn-2"
                                    onClick={() =>
                                      handleBanUnban(user._id, "UNBAN")
                                    }
                                  >
                                    UNBAN
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-sm refresh-btn-2"
                                    onClick={() =>
                                      handleBanUnban(user._id, "BAN")
                                    }
                                  >
                                    BAN
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserManagment;
