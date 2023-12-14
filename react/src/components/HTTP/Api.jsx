import axios from "axios";
const baseURL = "http://localhost:3001";
const api = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: "http://leadplanner.lotusx.shop/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application.json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const isUserExists = async (username) => {
  try {
    const response = await api.get(`/user/is-exist/${username}`);
    // console.log("session response -->", response);
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const getAllUsers = async (username) => {
  try {
    const response = await api.get(`/admin/user/get-all`);
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const getAllCountries = async (username) => {
  try {
    const response = await api.get(`/user/get-all-countries`);
    console.log("session response -->", response);
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const getStatesByCountry = async (state) => {
  try {
    const response = await api.get(`/user/get-statesByCountry/${state}`);
    console.log("session response -->", response);
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const createAccount = async (payload) => {
  try {
    const response = await api.post(`/user/create`);
    console.log("session response -->", response);
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const login = async (payload) => {
  try {
    const response = await api.post(`/user/login`, payload);
    console.log("session response -->", response);
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const banUnbanUser = async (payload) => {
  try {
    const response = await api.put(`/admin/user/change-status/${payload.id}`, {
      status: payload.action,
    });
    console.log("session response -->", response);
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const getAllCategories = async (username) => {
  try {
    const response = await api.get(`/admin/category/get-all`);
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const getAllProducts = async (username) => {
  try {
    const response = await api.get(`/admin/product/get-all`);
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await api.post(`/admin/product/get-byId`, { productId });
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const addCategory = async (payload) => {
  try {
    const response = await api.post(`/admin/category/add`, {
      categoryName: payload.addCatName,
    });
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const deleteCategory = async (payload) => {
  try {
    const response = await api.delete(`/admin/category/delete/${payload.id}`);
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const updateCategory = async (payload) => {
  try {
    const response = await api.put(`/admin/category/update/${payload.catId}`, {
      categoryName: payload.category,
    });
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const addProduct = async (payload) => {
  try {
    const response = await api.post(`/admin/product/add`, payload);
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const deleteProduct = async (payload) => {
  try {
    const response = await api.delete(
      `/admin/product/delete/${payload.productId}`
    );
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const updateProductApi = async (productId, updateData) => {
  try {
    const response = await api.put(
      `/admin/product/update/${productId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const deleteProductImageApi = async (payload) => {
  try {
    const response = await api.put(
      `/admin/product/deleteImage`,
      payload
    );
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const getAllFaqApi = async () => {
  try {
    const response = await api.get(`/admin/faq/get-all`);
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const addFaqApi = async (payload) => {
  try {
    const response = await api.post(`/admin/faq/add`, payload);
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};

export const updateFaqApi = async (id, payload) => {
  try {
    const response = await api.put(`/admin/faq/update/${id}`, payload);
    return response.data;
  } catch (error) {
    return "API FAILURE";
  }
};
