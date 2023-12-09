import React, { useEffect, useState } from "react";
import "../css/auth.css";
import { Link } from "react-router-dom";
import PinInput from "react-pin-input";
import { useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import {
  createAccount,
  getAllCountries,
  getStatesByCountry,
  isUserExists,
} from "../HTTP/Api";

function Registration() {
  const toast = useToast();

  const [countries, setCountries] = useState([]);
  const [passwordInput, setPasswordInput] = useState("Password");
  const [states, setStates] = useState([]);
  const [activeTab, setActiveTab] = useState("sign-up");
  const [signUpState, setSignUpState] = useState("");
  const [otp, setOtp] = useState();
  const [signUpCountry, setSignUpCountry] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpMobile, setSignUpMobile] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let countries = await getAllCountries();
        countries == `API FAILURE`
          ? setCountries([])
          : setCountries(countries.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const handelTabChange = async (activeTab) => {
    setActiveTab(activeTab);
  };

  const selectState = async () => {
    if (
      signUpCountry == undefined ||
      signUpCountry == null ||
      signUpCountry == ""
    )
      toast({
        description: `select country first.`,
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    const states = await getStatesByCountry(signUpCountry);
    states == `API FAILURE` ? setStates([]) : setStates(states.data);
    console.log("states", states);
  };

  const handleSendOtp = async (activeTab) => {
    const requiredFields = [
      "State",
      "Country",
      "Email",
      "Mobile",
      "Password",
      "FirstName",
      "LastName",
    ]; // Include first name and last name in required fields
    const emptyFields = requiredFields.filter((field) => {
      const value = eval(`signUp${field}`);
      return !value || !value.trim();
    });

    if (emptyFields.length > 0) {
      toast({
        description: `Please fill out the following fields: ${emptyFields.join(
          ", "
        )}`,
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }

    if (signUpMobile.length != 10) {
      toast({
        description: `invalid mobile number`,
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }

    const isUserAlreadyExists = await isUserExists(signUpMobile);
    if (isUserAlreadyExists.status == 1) {
      toast({
        description: `account already exist please login.`,
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    } else {
      setActiveTab(activeTab);
      toast({
        description: `otp sent on ${signUpEmail}`,
        status: "success",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      toast({
        description: `please enter 4 digit otp`,
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
    if (otp == "0000") {
      toast({
        description: `otp verified.`,
        status: "success",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      let payload = {
        useFirstName: signUpFirstName,
        userLastName: signUpLastName,
        mobile: signUpMobile,
        email: signUpEmail,
        password: signUpPassword,
      };

      const isAccountCreated = await createAccount(payload);
      isAccountCreated === `API FAILURE` &&
        toast({
          description: `error while creating account. please try later.`,
          status: "error",
          duration: 9000,
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
        });

      if (isAccountCreated.status == 1) {
        toast({
          description: isAccountCreated.message,
          status: "success",
          duration: 9000,
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        {/* ========= SignUp Component start ======== */}
        {activeTab === "sign-up" && (
          <div className="row justify-content-center">
            <div className="col-md-4 col-sm-8 col-11  auth-card align-item-center">
              <div className="card shadow ">
                <div className="card-header text-start">
                  <h4>Sign Up</h4>
                </div>
                <div className="card-body ">
                  <form className="login-form">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group pt-2 ">
                          <small for="exampleInputEmail1" className="pt-2">
                            Country
                          </small>
                          <select
                            className="form-control"
                            defaultChecked="India"
                            value={signUpCountry}
                            onChange={(e) => {
                              setSignUpCountry(e.target.value);
                              // setSignUpState();
                            }}
                          >
                            {countries.map((countries) => {
                              return (
                                <>
                                  <option>{countries.name}</option>
                                </>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group pt-2 ">
                          <small for="exampleInputEmail1" className="pt-2">
                            State
                          </small>
                          <select
                            className="form-control"
                            value={signUpState}
                            onClick={(e) => {
                              selectState();
                            }}
                            onChange={(e) => {
                              setSignUpState(e.target.value);
                            }}
                          >
                            {states.map((states) => {
                              return (
                                <>
                                  <option>{states.name}</option>
                                </>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group pt-2 ">
                          <input
                            className="form-control"
                            placeholder="First name"
                            value={signUpFirstName}
                            onChange={(e) => {
                              setSignUpFirstName(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group pt-2 ">
                          <input
                            className="form-control"
                            placeholder="Last name"
                            value={signUpLastName}
                            onChange={(e) => {
                              setSignUpLastName(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group pt-2 ">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={signUpEmail}
                        onChange={(e) => {
                          setSignUpEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group pt-2 ">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Phone"
                        value={signUpMobile}
                        onChange={(e) => {
                          setSignUpMobile(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group pt-2">
                      <input
                        type={passwordInput}
                        className="form-control"
                        placeholder="Password"
                        value={signUpPassword}
                        onChange={(e) => {
                          setSignUpPassword(e.target.value);
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
                        handleSendOtp("otp-verify");
                      }}
                    >
                      Send Otp
                    </button>
                    <div className="mt-2">
                      Already have an Account?
                      <Link to={"/login"}>Login</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ========= SignUp Component end ======== */}

        {/* ========= SignUp Component start ======== */}
        {activeTab === "otp-verify" && (
          <div className="row justify-content-center">
            <div className="col-md-4 col-sm-8 col-11  auth-card align-item-center">
              <div className="card shadow ">
                <div className="card-header text-start">
                  <h4>Authenticate </h4>
                </div>
                <div className="card-body ">
                  <form className="login-form">
                    <small for="exampleInputEmail1" className="pt-2">
                      otp sent on <strong>{signUpEmail}</strong>
                      <i
                        class="bi bi-pencil-square"
                        onClick={() => {
                          handelTabChange("sign-up");
                        }}
                      ></i>
                    </small>
                    <div className="pt-1">
                      <PinInput
                        length={4}
                        initialValue=""
                        secret
                        secretDelay={750}
                        // onChange={(e) => {
                        //   setOtp(e.target.value);
                        // }}
                        onChange={(value, index) => {
                          setOtp(value);
                        }}
                        type="numeric"
                        inputMode="number"
                        style={{ padding: "0px" }}
                        inputStyle={{ borderColor: "black" }}
                        inputFocusStyle={{ borderColor: "green" }}
                        onComplete={(value, index) => {}}
                        autoSelect={false}
                        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                      />
                    </div>

                    <hr />
                    <div className="row">
                      <div className="col-md-6 col-11 mt-2">
                        <button
                          className="btn login-btn"
                          onClick={(e) => {
                            handleVerifyOtp(e);
                          }}
                        >
                          Verify & SignUp
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ========= SignUp Component end ======== */}
      </div>
    </>
  );
}

export default Registration;
