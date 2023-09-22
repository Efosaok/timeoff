import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ModalContext from "../../contexts/ModalContext";
import Footer from "../partials/bits/Footer";
import Header from "../partials/bits/Header";

const Root = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => setShowModal(!showModal);

  return (
    <div className="container">
      <ModalContext.Provider value={{ showModal, setShowModal, toggleShowModal }}>
        <Header />
        <Outlet />
        <Footer />
      </ModalContext.Provider>
    </div>
  )
};

export default Root;
