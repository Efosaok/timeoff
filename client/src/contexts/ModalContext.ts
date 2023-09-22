import { createContext, Dispatch, SetStateAction } from "react";

interface ModalContextProps {
  showModal?: boolean,
  setShowModal?: Dispatch<SetStateAction<boolean>>,
  toggleShowModal?: () => void,
}
const ModalContext = createContext<ModalContextProps>({});

export default ModalContext;
