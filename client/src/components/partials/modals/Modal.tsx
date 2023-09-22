import React, { useContext } from "react";
import ModalContext from "../../../contexts/ModalContext";

interface ModalProps {
  children: React.ReactNode;
  title: string;
}
const Modal: React.FC<ModalProps> = ({ children, title }) => {
  const { showModal, toggleShowModal } = useContext(ModalContext);

  return (
    <div className="modal-open">
      {showModal ? 
      (<>
        <div className="modal fade in">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button onClick={toggleShowModal} type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="exampleModalLabel">{title}</h4>
              </div>
              {children}
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade"></div>
      </>) : null}
    </div>
  )
};

export default Modal;
