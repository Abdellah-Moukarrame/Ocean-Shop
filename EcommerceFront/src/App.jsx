import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";

import Navigation from "./components/AnimateNav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/SingUp";
import Footer from "./components/Footer";

import Account from "./pages/user/Account";
import NotFound from "./pages/NotFound";
import AddProduct from "./pages/admin/AddProduct";

import AccessDenied from "./pages/AccessDenied";
import ProductList from "./pages/admin/ProductList";
import Dashboard from "./pages/admin/Dashboard";
import ProductEdit from "./pages/admin/ProductEdit";
import Verify from "./pages/verify_user/verify";

import Cart from "./pages/user/Cart";
import About from "./pages/About";
import useAuthContext from "./context/AuthContext";
import ProductDetail from "./pages/ProductDetails";
import ProductMens from "./pages/ProductMens";
import ProductWomens from "./pages/ProductWomens";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import CheckoutPage from "./pages/CheckoutPage";
import EmailVerified from "./pages/EmailVerified";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OrderLIst from "./pages/admin/OrderList";
import UserOrder from "./pages/user/Order";
import OrderInfo from "./pages/admin/OrderInfo";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ThankYou from "./pages/ThankYou";

function App() {
  const { user } = useAuthContext();

  function PublicElement({ children }) {
    return <>{children}</>;
  }
  function AuthElement({ children }) {
    if (!user) {
      return <>{children}</>;
    } else {
      return <Navigate to="/" />;
    }
  }
  function UserElement({ children }) {
    if (user || user?.is_admin) {
      return <>{children}</>;
    } else {
      return <Navigate to="/login" />;
    }
  }
  function AdminElement({ children }) {
    if (!(user && user.is_admin)) {
      return <Navigate to="/access_denied" />;
    }
    return <>{children}</>;
  }

  return (
    <>
      <div className=" fixed top-0 w-full z-50">
        <Navigation />
      </div>

      <div className="h-auto z-10">
        <Routes>
          {/* admin and user verification routes */}
          <Route path="/verify" element={<Verify />} />

          {/* for admin only routes */}
          <Route
            path="/dashboard"
            element={
              <AdminElement>
                <Dashboard />
              </AdminElement>
            }
          />
          <Route
            path="/addProduct"
            element={
              <AdminElement>
                <AddProduct />
              </AdminElement>
            }
          />
          <Route
            path="/productsList"
            element={
              <AdminElement>
                <ProductList />
              </AdminElement>
            }
          />

          <Route
            path="/products/:id/edit"
            element={
              <AdminElement>
                <ProductEdit />
              </AdminElement>
            }
          />

          <Route path="/ordersList" element={<OrderLIst />} />

          <Route path="/ordersList/:id/edit" element={<OrderInfo />} />

          {/* public/user routes */}

          <Route
            path="/login"
            element={
              <AuthElement>
                <Login />
              </AuthElement>
            }
          />

          <Route
            path="/forgotPassword"
            element={
              <AuthElement>
                <ForgotPassword />
              </AuthElement>
            }
          />

          <Route
            path="/password-reset/:token"
            element={
              <AuthElement>
                <ResetPassword />
              </AuthElement>
            }
          />

          <Route
            path="/register"
            element={
              <AuthElement>
                <Register />
              </AuthElement>
            }
          />
          <Route
            path="/account"
            element={
              <UserElement>
                <Account />
              </UserElement>
            }
          />

          <Route
            path="/order"
            element={
              <UserElement>
                <UserOrder />
              </UserElement>
            }
          />

          <Route
            path="/email/verified"
            element={
              <PublicElement>
                <EmailVerified />
              </PublicElement>
            }
          />

          <Route
            path="/cart"
            element={
              <PublicElement>
                <Cart />
              </PublicElement>
            }
          />

          <Route
            path="/checkout"
            element={
              <UserElement>
                <CheckoutPage />
              </UserElement>
            }
          />

          <Route
            path="/about"
            element={
              <PublicElement>
                <About />
              </PublicElement>
            }
          />

          <Route
            path="/contact"
            element={
              <PublicElement>
                <Contact />
              </PublicElement>
            }
          />

          <Route
            path="/mens"
            element={
              <PublicElement>
                <ProductMens />
              </PublicElement>
            }
          />

          <Route
            path="/womens"
            element={
              <PublicElement>
                <ProductWomens />
              </PublicElement>
            }
          />

          <Route
            path="/newProducts"
            element={
              <PublicElement>
                <NewProduct />
              </PublicElement>
            }
          />

          <Route
            path="/product"
            element={
              <PublicElement>
                <Product />
              </PublicElement>
            }
          />

          <Route
            path="/products/:id/info"
            element={
              <PublicElement>
                <ProductDetail />
              </PublicElement>
            }
          />

          <Route
            path="/privacypolicy"
            element={
              <PublicElement>
                <PrivacyPolicy />
              </PublicElement>
            }
          />

          <Route
            path="/thankyou"
            element={
              <PublicElement>
                <ThankYou />
              </PublicElement>
            }
          />

          {/* Error Page */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/access_denied" element={<AccessDenied />} />
        </Routes>
      </div>

      
    <Footer />
      
    </>
  );
}

export default App;
