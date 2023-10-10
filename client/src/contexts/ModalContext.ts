import { createContext, Dispatch, SetStateAction } from "react";

export interface ModalProps {
  general?: boolean;
  addDepartment?: boolean;
  bookLeave?: boolean;
  handleRequest?: boolean;
  addLeaveType?: boolean;
  addBankHoliday?: boolean;
  addBlockedView?: boolean;
  selectSupervisors?: boolean;
}

interface ModalContextProps {
  showModal?: boolean,
  setShowModal?: Dispatch<SetStateAction<ModalProps>>,
  toggleShowModal: (name?: keyof ModalProps) => void,
  setModalVisibility: (value: boolean, name?: keyof ModalProps) => void,
  canShowModal: (name?: keyof ModalProps) => boolean | undefined;
}
const ModalContext = createContext<ModalContextProps>({
  toggleShowModal: () => {},
  canShowModal: () => false,
  setModalVisibility: () => {},
});

export default ModalContext;
