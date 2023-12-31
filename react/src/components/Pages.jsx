import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./404";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import AdminHomePage from "./admin/AdminHomePage";
import AdminDashboard from "./admin/AdminDashboard";
import UsersAnalysis from "./admin/UsersAnalysis";
import ProductAnalysis from "./admin/ProductAnalysis";
import RevenueAnalysis from "./admin/RevenueAnalysis";
import AdminUserManagment from "./admin/AdminUserManagment";
import AdminProductMangment from "./admin/AdminProductMangment";
import SecureRoutesAdmin from "./SecureRoutesAdmin";
import EditProduct from "./admin/EditProduct";
import AdminTicketManagement from "./admin/AdminTicketManagement";
import AdminFaqManagement from "./admin/AdminFaqManagement";
import Home from "./site/Home";
// import Testing from "./Testing";

function Pages() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/home"
          element={<SecureRoutesAdmin Component={AdminHomePage} />}
        />
        <Route
          path="/admin/dashboard"
          element={<SecureRoutesAdmin Component={AdminDashboard} />}
        />
        <Route
          path="/admin/analysis/users"
          element={<SecureRoutesAdmin Component={UsersAnalysis} />}
        />
        <Route
          path="/admin/analysis/products"
          element={<SecureRoutesAdmin Component={ProductAnalysis} />}
        />
        <Route
          path="/admin/analysis/revenue"
          element={<SecureRoutesAdmin Component={RevenueAnalysis} />}
        />
        <Route
          path="/admin/manage/users"
          element={<SecureRoutesAdmin Component={AdminUserManagment} />}
        />
        <Route
          path="/admin/manage/products"
          element={<SecureRoutesAdmin Component={AdminProductMangment} />}
        />
        <Route
          path="/admin/manage/tickets"
          element={<SecureRoutesAdmin Component={AdminTicketManagement} />}
        />
        <Route
          path="/admin/manage/faq"
          element={<SecureRoutesAdmin Component={AdminFaqManagement} />}
        />
        <Route
          path="/admin/manage/product/edit/:productId"
          element={<SecureRoutesAdmin Component={EditProduct} />}
        />
        {/* <Route path="/" element={<SecureRoutesAdmin Component={Home} />} /> */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}

export default Pages;
