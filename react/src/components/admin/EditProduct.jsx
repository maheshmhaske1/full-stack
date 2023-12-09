import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import { useToast } from "@chakra-ui/react";
import CloudinaryWidget from "./CloudinaryWidget ";
import { useParams } from "react-router-dom";
import {
  getProduct,
  getAllCategories,
  updateProd,
  updateProductApi,
} from "../HTTP/Api";

function EditProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [images, setImages] = useState([]);
  const [name, setName] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [files, setFiles] = useState(null);
  const [description, setDescription] = useState();
  const [category, setCategory] = useState([]);
  const [newImage, setNewImage] = useState([]);
  const [isActive, setIsActive] = useState();
  const toast = useToast();

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

  const loadProduct = async () => {
    const productinfo = await getProduct(productId);
    if (productinfo == "API FAILURE") {
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
    if (productinfo.status == false) {
      toast({
        description: productinfo.message,
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
    if (productinfo.status == true) {
      setProduct(productinfo.data[0]);
      setImages(productinfo.data[0].images);
      setName(productinfo.data[0].productName);
      setDescription(productinfo.data[0].productDescription);
      setPrice(productinfo.data[0].price);
      setQuantity(productinfo.data[0].totalQuantity);
      setIsActive(productinfo.data[0].isActive);
    }
  };

  const updateProduct = async () => {
    let fd = new FormData();
    for (let i = 0; i < files?.length; i++) {
      fd.append(`images${i + 1}`, files[i]);
    }

    fd.append("productName", name);
    fd.append("productDescription", description);
    fd.append("price", price);
    fd.append("totalQuantity", quantity);
    fd.append("isActive", isActive);

    console.log("form data ==>",files);

    const isProductUpdated = await updateProductApi(productId, fd);
    if (isProductUpdated == "API FAILURE") {
      toast({
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
    if (isProductUpdated.status == false) {
      toast({
        description: isProductUpdated.message,
        status: "error",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
    if (isProductUpdated.status == true) {
      toast({
        description: isProductUpdated.message,
        status: "success",
        duration: 9000,
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      loadProduct();
    }
  };
  useEffect(() => {
    loadProduct();
    getAllCat();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <div className="container-fluid cards">
        <div className="row justify-content-center">
          <div className="col-md-11 col-12 pb-4">
            <div className="card shadow">
              <div className="card-header text-start">
                <div className="row">
                  <div className="col">
                    <div>
                      <h4>Edit Product</h4>
                    </div>
                  </div>
                  <div className="col text-end">
                    <input
                      type="file"
                      name="images"
                      multiple
                      onChange={(e) => {
                        setFiles(e.target.files);
                      }}
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <div className="card-body shadow">
                      <div className="row justify-content-center">
                        <div className="row">
                          {images.map((image) => {
                            return (
                              <>
                                <div className="col-sm-4 mb-3">
                                  <div className="card">
                                    <div className="card-body">
                                      <img
                                        src={image}
                                        alt=""
                                        className="img-fluid"
                                      />
                                      <button
                                        className=" col btn refresh-btn mt-2"
                                        onClick={() => {
                                          // alert(item.title);
                                        }}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <form className="login-form">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group pt-2 ">
                          <input
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
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
                            value={quantity}
                            onChange={(e) => {
                              setQuantity(e.target.value);
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
                            value={price}
                            onChange={(e) => {
                              setPrice(e.target.value);
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
                              // setAddProductCategory(e.target.value);
                            }}
                          >
                            <option value="" disabled selected hidden>
                              ------- select category -------
                            </option>

                            {category.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-6 ">
                        <div className="form-group pt-2 ">
                          <select
                            className="form-control"
                            style={{ textAlign: "center" }}
                            value={isActive}
                            onChange={(e) => {
                              setIsActive(e.target.value);
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
                        value={description}
                        rows={7}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      className=" col btn refresh-btn mt-2"
                      onClick={(e) => {
                        e.preventDefault();
                        updateProduct();
                      }}
                    >
                      update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
