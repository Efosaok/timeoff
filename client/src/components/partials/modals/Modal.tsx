import React, { useContext } from "react";
import ModalContext, { ModalProps } from "../../../contexts/ModalContext";

interface ModalWrapProps {
  children: React.ReactNode;
  title: string;
  name?: keyof ModalProps;
  id?: string;
}
const Modal: React.FC<ModalWrapProps> = ({ children, title, name, id }) => {
  const { canShowModal, toggleShowModal } = useContext(ModalContext);

  const toggleModal = () => toggleShowModal(name)

  const showModal = canShowModal(name);

  return (
    <div className="modal-open">
      {showModal ? 
      (<>
        <div className="modal fade in" id={id}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button onClick={toggleModal} type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
