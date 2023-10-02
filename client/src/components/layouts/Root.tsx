import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ModalContext, { ModalProps } from "../../contexts/ModalContext";
import Footer from "../partials/bits/Footer";
import Header from "../partials/bits/Header";

const Root = () => {
  const [modalProps, setShowModal] = useState<ModalProps>({ general: false });

  const toggleShowModal = (name: keyof ModalProps = 'general') => setShowModal({ [name]: !modalProps[name] });

  const canShowModal = (name: keyof ModalProps = 'general') =>  modalProps[name];

  const showModal = modalProps?.general;

  return (
    <div className="container">
      <ModalContext.Provider value={{ canShowModal, setShowModal, toggleShowModal, showModal }}>
        <Header />
        <Outlet />
        <Footer />
      </ModalContext.Provider>
    </div>
  );
};

export default Root;
