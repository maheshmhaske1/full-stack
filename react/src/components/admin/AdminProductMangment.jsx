import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { InputText } from "primereact/inputtext";
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
import "./css/adminUserManagement.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import {
  addCategory,
  addProduct,
  deleteCategory,
  deleteProduct,
  getAllCategories,
  getAllProducts,
  updateCategory,
} from "../HTTP/Api";

function AdminProductMangment() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [addCatName, setAddCatName] = useState("");
  const [currentTab, setCurrentTab] = useState("category");
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [updateCategoryId, setUpdateCategoryId] = useState("");
  const [addProductName, setAddProductName] = useState("");
  const [addProductPrice, setAddProductPrice] = useState();
  const [addProductQuantity, setAddProductQuantity] = useState();
  const [addProductIsActive, setAddProductIsActive] = useState();
  const [addProductDescription, setAddProductDescription] = useState("");
  const [addProductCategory, setAddProductCategory] = useState("");
  const [modelOpen, setModelOpen] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const getAllCat = async () => {
    const totalCategories = await getAllCategories();
    if (totalCategories == "API FAILURE") {
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    } else {
      setCategory(totalCategories.data);
    }
  };

  const loadAllProducts = async () => {
    const totalProducts = await getAllProducts();
    if (totalProducts == "API FAILURE") {
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    } else {
      setProducts(totalProducts.data);
    }
  };

  useEffect(() => {
    getAllCat();
  }, []);

  const handleAddCategory = async () => {
    if (!addCatName) {
      toast({
        description: "category name is required",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }
    const payload = {
      addCatName: addCatName,
    };

    const isCategoryCreated = await addCategory(payload);
    if (isCategoryCreated == "API FAILURE") {
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }

    if (isCategoryCreated.status == true) {
      toast({
        description: isCategoryCreated.message,
        status: "success",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      setAddCatName("");
      await getAllCat();
      {
        onClose();
      }
    }
  };

  const handleAddProduct = async () => {
    const payload = {
      productName: addProductName,
      productDescription: addProductDescription,
      price: addProductPrice,
      category: addProductCategory,
      totalQuantity: addProductQuantity,
    };

    const isProductAdded = await addProduct(payload);
    if (isProductAdded == "API FAILURE") {
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }

    if (isProductAdded.status == true) {
      toast({
        description: isProductAdded.message,
        status: "success",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      setAddProductName("");
      setAddProductCategory();
      setAddProductPrice();
      setAddProductIsActive();
      setAddProductDescription("");
      await loadAllProducts();
      {
        onClose();
      }
    }
    if (isProductAdded.status == false) {
      toast({
        description: isProductAdded.message,
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }
  };

  const handeleDeleteProduct = async (productId) => {
    if (!productId) {
      toast({
        description: "productId is required",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }
    const isProductDeleted = await deleteProduct({ productId: productId });
    if (isProductDeleted == "API FAILURE") {
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }
    toast({
      description: isProductDeleted.message,
      status: "success",
      duration: 9000,
      position: "top-right",
      variant: "left-accent",
      isClosable: true,
    });
    await loadAllProducts();
    {
      onClose();
    }
  };

  const handeleDeleteCategory = async (categoryId) => {
    if (!categoryId) {
      toast({
        description: "categoryId is required",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }
    const isCategoryDeleted = await deleteCategory({ id: categoryId });
    if (isCategoryDeleted == "API FAILURE") {
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
    toast({
      description: isCategoryDeleted.message,
      status: isCategoryDeleted.status == false ? "error" : "success",
      duration: 9000,
      position: "top-right",
      variant: "left-accent",
      isClosable: true,
    });
    await getAllCat();
    {
      onClose();
    }
  };

  const handleUpdateCategory = async (req, res) => {
    if (!updateCategoryName) {
      toast({
        description: "category name is required",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }

    let payload = { catId: updateCategoryId, category: updateCategoryName };
    const isCategoryUpdated = await updateCategory(payload);
    if (isCategoryUpdated == "API FAILURE") {
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
    toast({
      description: isCategoryUpdated.message,
      status: "success",
      duration: 9000,
      position: "top-right",
      variant: "left-accent",
      isClosable: true,
    });
    await getAllCat();
    {
      onClose();
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
                {currentTab === "product" && (
                  <div className="row">
                    <div className="col">
                      <h4>Product Management</h4>{" "}
                    </div>
                    <div className="col ">
                      <button
                        className="btn refresh-btn w-100"
                        onClick={(e) => {
                          setCurrentTab("category");
                        }}
                      >
                        Go to Category Management
                      </button>
                    </div>
                  </div>
                )}
                {currentTab === "category" && (
                  <div className="row">
                    <div className="col">
                      <h4>Category Management</h4>{" "}
                    </div>
                    <div className="col ">
                      <button
                        className="btn refresh-btn w-100"
                        onClick={(e) => {
                          setCurrentTab("product");
                          loadAllProducts();
                        }}
                      >
                        Go to Product Management
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="card-body">
                <div className="card">
                  <div className="row justify-content-center">
                    <div className="col-md-3">
                      <div className="text-start p-1">
                        <InputText
                          id="search-input"
                          value={globalFilter}
                          placeholder="Global Search"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text-center p-1">
                        <button className="btn refresh-btn">Refresh</button>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="text-center p-1">
                        {currentTab === "category" && (
                          <button
                            className="btn refresh-btn w-10"
                            onClick={() => {
                              onOpen(); // Call the existing function
                              setModelOpen("category");
                            }}
                          >
                            {" "}
                            Add Category
                          </button>
                        )}
                        {currentTab === "product" && (
                          <button
                            className="btn refresh-btn w-10"
                            onClick={() => {
                              onOpen(); // Call the existing function
                              setModelOpen("product");
                            }}
                          >
                            {" "}
                            Add Product
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Category Table */}
                  {currentTab === "category" && (
                    <div class="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Created At</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.map((category, i) => {
                            return (
                              <tr key={category._id}>
                                <td>{i + 1}</td>
                                <td>{category.categoryName}</td>
                                <td>
                                  <b>{category.createdAt.slice(0, 10)}</b>{" "}
                                </td>
                                <td>
                                  <Stack direction="row">
                                    <Badge
                                      variant="solid"
                                      colorScheme="red"
                                      fontSize="1em"
                                      onClick={(e) => {
                                        handeleDeleteCategory(category._id);
                                      }}
                                    >
                                      Delete
                                    </Badge>
                                    <Badge
                                      variant="solid"
                                      colorScheme="pink"
                                      fontSize="1em"
                                      onClick={(e) => {
                                        setModelOpen("updateCategory");
                                        onOpen();
                                        setUpdateCategoryId(category._id);
                                        setUpdateCategoryName(
                                          category.categoryName
                                        );
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
                  )}

                  {/* Product Table */}
                  {currentTab === "product" && (
                    <div class="table-responsive" style={{ overflowX: "auto" }}>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Images</th>
                            <th scope="col">Description</th>
                            <th scope="col">price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">is Active</th>
                            <th scope="col">Category</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product, i) => {
                            return (
                              <tr key={product._id}>
                                <td>{i + 1}</td>
                                <td>{product.productName}</td>
                                <td>
                                  <Badge fontSize="1.0em" colorScheme="green">
                                    {product.images.length}
                                  </Badge>
                                </td>
                                <td>{product.productDescription}</td>
                                <td>
                                  <Badge fontSize="1.0em" colorScheme="purple">
                                    {product.price}
                                  </Badge>
                                </td>
                                <td>
                                  <Badge
                                    fontSize="1.0em"
                                    colorScheme={
                                      product.totalQuantity > 10
                                        ? "green"
                                        : "red"
                                    }
                                  >
                                    {product.totalQuantity}
                                  </Badge>
                                </td>
                                <td>
                                  <Badge
                                    fontSize="1.0em"
                                    colorScheme={
                                      product.isActive == true ? "green" : "red"
                                    }
                                  >
                                    {product.isActive ? "Active" : "Inactive"}
                                  </Badge>
                                </td>
                                <td>
                                  <Badge fontSize="1.0em" colorScheme="purple">
                                    {product.category[0].categoryName}
                                  </Badge>
                                </td>

                                <td>
                                  <b>{product.createdAt.slice(0, 10)}</b>{" "}
                                </td>
                                <td>
                                  <Stack direction="row">
                                    <Badge
                                      variant="solid"
                                      colorScheme="red"
                                      fontSize="1em"
                                      onClick={(e) => {
                                        handeleDeleteProduct(product._id);
                                      }}
                                    >
                                      Delete
                                    </Badge>
                                    <Badge
                                      variant="solid"
                                      colorScheme="pink"
                                      fontSize="1em"
                                      onClick={(e) => {
                                        navigate(
                                          `/admin/manage/product/edit/${product._id}`
                                        );
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========== add product model =========== */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={modelOpen == "product" ? "xl" : "md"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className={modelOpen == "products" && "text-center"}>
            {modelOpen === "category"
              ? "Add Category"
              : "updateCategory"
              ? "update Category"
              : "Add Product"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {modelOpen === "product" && (
              <>
                <div className="row justify-content-center">
                  <div>
                    <form className="login-form">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group pt-2 ">
                            <input
                              className="form-control"
                              placeholder="Name"
                              onChange={(e) => {
                                setAddProductName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group pt-2 ">
                            <input
                              type="Number"
                              className="form-control"
                              placeholder="Quantity"
                              onChange={(e) => {
                                setAddProductQuantity(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group pt-2 ">
                            <input
                              type="Number"
                              className="form-control"
                              placeholder="Price"
                              onChange={(e) => {
                                setAddProductPrice(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group pt-2">
                            <select
                              className="form-control"
                              style={{ textAlign: "center" }}
                              onChange={(e) => {
                                setAddProductCategory(e.target.value);
                              }}
                            >
                              <option value="" disabled selected hidden>
                                ------- select category -------
                              </option>
                              {category.map((category) => {
                                return (
                                  <option value={category._id}>
                                    {category.categoryName}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="col-6 ">
                          <div className="form-group pt-2 ">
                            <select
                              className="form-control"
                              style={{ textAlign: "center" }}
                              onChange={(e) => {
                                setAddProductIsActive(e.target.value);
                              }}
                            >
                              <option value="" disabled selected hidden>
                                ------- is active? -------
                              </option>
                              <option value={true}>YES</option>
                              <option value={false}>NO</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="form-group pt-2 ">
                        <textarea
                          style={{
                            border: "1px solid black",
                            borderRadius: "0%",
                          }}
                          className="form-control"
                          placeholder="Description"
                          rows={7}
                          onChange={(e) => {
                            setAddProductDescription(e.target.value);
                          }}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
            {modelOpen === "category" && (
              <form className="login-form">
                <div className="form-group pt-2 ">
                  <input
                    className="form-control"
                    placeholder="Category Name"
                    onChange={(e) => {
                      setAddCatName(e.target.value);
                    }}
                  />
                </div>
              </form>
            )}
            {modelOpen === "updateCategory" && (
              <form className="login-form">
                <div className="form-group pt-2 ">
                  <input
                    className="form-control"
                    placeholder="Category Name"
                    value={updateCategoryName}
                    onChange={(e) => {
                      setUpdateCategoryName(e.target.value);
                    }}
                  />
                </div>
              </form>
            )}
          </ModalBody>

          <ModalFooter>
            <Button className="refresh-btn" mr={3} onClick={onClose}>
              Close
            </Button>

            {modelOpen === "category" && (
              <button
                className=" col btn refresh-btn"
                onClick={() => {
                  handleAddCategory();
                }}
              >
                Add Category
              </button>
            )}
            {modelOpen === "updateCategory" && (
              <button
                className=" col btn refresh-btn"
                onClick={() => {
                  handleUpdateCategory();
                }}
              >
                update Category
              </button>
            )}
            {modelOpen === "product" && (
              <button
                className="col btn refresh-btn"
                onClick={() => {
                  onOpen();
                  handleAddProduct();
                }}
              >
                Add Product
              </button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AdminProductMangment;
