import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import { useToast } from "@chakra-ui/react";
import "./css/adminUserManagement.css";
import { InputText } from "primereact/inputtext";
import { Switch } from "@chakra-ui/react";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { Badge } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {
  addFaqApi,
  banUnbanUser,
  getAllFaqApi,
  getAllUsers,
  updateFaqApi,
} from "../HTTP/Api";

function AdminFaqManagement() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [globalFilter, setGlobalFilter] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [updateQuestion, setUpdateQuestion] = useState("");
  const [updateAnswer, setUpdateAnswer] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [modelOpen, setModelOpen] = useState("");
  const [faqs, setFaqs] = useState([]);

  const getFaqs = async () => {
    const totalFaqs = await getAllFaqApi();
    if (totalFaqs == "API FAILURE") {
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    } else {
      setFaqs(totalFaqs.data);
    }
  };

  const handleAddFaq = async () => {
    const payload = {
      question: question,
      answer: answer,
    };

    const isFaqAdded = await addFaqApi(payload);
    console.log(isFaqAdded);
    if (isFaqAdded == "API FAILURE") {
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
    if (isFaqAdded.status == false) {
      toast({
        description: isFaqAdded.message,
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
    if (isFaqAdded.status == true) {
      toast({
        description: isFaqAdded.message,
        status: "success",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      getFaqs();
      setQuestion("");
      setAnswer("");
    }
  };

  const handleActivate = async (id) => {
    const payload = { isActive: true };
    const isUserActivated = await updateFaqApi(id, payload);
    if (isUserActivated == "API FAILURE") {
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
    if (isUserActivated.status == false) {
      toast({
        description: isUserActivated.message,
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
    if (isUserActivated.status == true) {
      toast({
        description: isUserActivated.message,
        status: "success",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      getFaqs();
    }
  };

  const handleDeActivate = async (id) => {
    const payload = { isActive: false };
    const isUserDeActivated = await updateFaqApi(id, payload);
    if (isUserDeActivated == "API FAILURE") {
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
    if (isUserDeActivated.status == false) {
      toast({
        description: isUserDeActivated.message,
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
    if (isUserDeActivated.status == true) {
      toast({
        description: isUserDeActivated.message,
        status: "success",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      getFaqs();
    }
  };

  const handleUpdateFaq = async () => {
    const payload = { question: updateQuestion, answer: updateAnswer };
    const isUserDeActivated = await updateFaqApi(updateId, payload);
    if (isUserDeActivated == "API FAILURE") {
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
    if (isUserDeActivated.status == false) {
      toast({
        description: isUserDeActivated.message,
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
    if (isUserDeActivated.status == true) {
      toast({
        description: isUserDeActivated.message,
        status: "success",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      getFaqs();
      onClose();
    }
  };

  useEffect(() => {
    getFaqs();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <div className="container-fluid cards">
        <div className="row justify-content-center">
          <div className="col-md-11 col-12 pb-4">
            <div className="card shadow">
              <div className="card-header text-start">
                <div>
                  <h4>FAQ Management</h4>
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
                          // onChange={onGlobalFilterChange}
                          placeholder="Global Search"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text-center p-1">
                        <button className="btn refresh-btn" onClick={getFaqs}>
                          Refresh
                        </button>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="text-center p-1">
                        <button
                          className="btn refresh-btn w-10"
                          onClick={() => {
                            onOpen(); // Call the existing function
                            setModelOpen("add");
                          }}
                        >
                          Add FAQ
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Question</th>
                          <th scope="col">Answer</th>
                          <th scope="col">Active?</th>
                          <th scope="col">Created At</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {faqs.map((faq, i) => {
                          return (
                            <tr key={faq._id}>
                              <td>{i + 1}</td>
                              <td>{faq.question}</td>
                              <td>{faq.answer}</td>
                              <td>
                                {faq.isActive == true ? (
                                  <Badge fontSize="1.0em" colorScheme="green">
                                    YES
                                  </Badge>
                                ) : (
                                  <Badge fontSize="1.0em" colorScheme="red">
                                    NO
                                  </Badge>
                                )}
                              </td>
                              <td>
                                <b>{faq.createdAt.slice(0, 10)}</b>{" "}
                              </td>
                              <td>
                                <Stack direction="row">
                                  {faq.isActive == true && (
                                    <Badge
                                      variant="solid"
                                      colorScheme="red"
                                      fontSize="1em"
                                      onClick={(e) => {
                                        handleDeActivate(faq._id);
                                      }}
                                    >
                                      Deactivate
                                    </Badge>
                                  )}
                                  {faq.isActive == false && (
                                    <Badge
                                      variant="solid"
                                      colorScheme="green"
                                      fontSize="1em"
                                      onClick={(e) => {
                                        handleActivate(faq._id);
                                      }}
                                    >
                                      Activate
                                    </Badge>
                                  )}
                                  <Badge
                                    variant="solid"
                                    colorScheme="pink"
                                    fontSize="1em"
                                    onClick={() => {
                                      onOpen(); // Call the existing function
                                      setModelOpen("edit");
                                      setUpdateId(faq._id);
                                      setUpdateAnswer(faq.answer);
                                      setUpdateQuestion(faq.question);
                                    }}
                                  >
                                    Edit
                                  </Badge>
                                </Stack>
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

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className={modelOpen == "products" && "text-center"}>
            {modelOpen === "add" ? "Add FAQ" : "update FAQ"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {modelOpen === "add" && (
              <>
                <div className="row justify-content-center">
                  <div>
                    <form className="login-form">
                      <div className="form-group pt-2 ">
                        <Stack align="center" direction="row">
                          <Switch
                            colorScheme="red"
                            size="lg"
                            // onChange={(e) => setActive(e.target.checked)}
                          />
                        </Stack>
                        <textarea
                          style={{
                            border: "1px solid black",
                            borderRadius: "0%",
                          }}
                          className="form-control mt-2"
                          placeholder="Question"
                          rows={2}
                          onChange={(e) => {
                            setQuestion(e.target.value);
                          }}
                        />
                        <textarea
                          style={{
                            border: "1px solid black",
                            borderRadius: "0%",
                          }}
                          className="form-control mt-2"
                          placeholder="Description"
                          rows={6}
                          onChange={(e) => {
                            setAnswer(e.target.value);
                          }}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
            {modelOpen === "edit" && (
              <>
                <div className="row justify-content-center">
                  <div>
                    <form className="login-form">
                      <div className="form-group pt-2 ">
                        <Stack align="center" direction="row">
                          <Switch
                            colorScheme="blackAlpha"
                            size="lg"
                            // checked={active}
                            onChange={(e) => {
                              // setActive(e.target.checked);
                            }}
                          />
                        </Stack>
                        <textarea
                          style={{
                            border: "1px solid black",
                            borderRadius: "0%",
                          }}
                          className="form-control mt-2"
                          placeholder="Question"
                          value={updateQuestion}
                          rows={2}
                          onChange={(e) => {
                            setUpdateQuestion(e.target.value);
                          }}
                        />
                        <textarea
                          style={{
                            border: "1px solid black",
                            borderRadius: "0%",
                          }}
                          value={updateAnswer}
                          className="form-control mt-2"
                          placeholder="Description"
                          rows={6}
                          onChange={(e) => {
                            setUpdateAnswer(e.target.value);
                          }}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button className="refresh-btn" mr={3} onClick={onClose}>
              Close
            </Button>
            {modelOpen === "add" && (
              <button
                className="col btn refresh-btn"
                onClick={() => {
                  onOpen();
                  handleAddFaq();
                }}
              >
                Add FAQ
              </button>
            )}
            {modelOpen === "edit" && (
              <button
                className="col btn refresh-btn"
                onClick={() => {
                  onOpen();
                  handleUpdateFaq();
                }}
              >
                Update FAQ
              </button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AdminFaqManagement;
