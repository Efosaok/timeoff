import { useState } from "react"
import { FLASH_DEFAULTS } from "../utils/constants";

export interface FlashProps {
  messages?: string[];
  errors?: string[];
}

export type UpdateFlashT = (messages: string[], type?: keyof FlashProps) => void;

const useFlash = () => {
  const [flash, setFlash] = useState<FlashProps>(FLASH_DEFAULTS);

  const updateFlash: UpdateFlashT = (messages, type = 'messages') => setFlash({ ...FLASH_DEFAULTS, [type]: messages });
  const { messages, errors } = flash;

  return {
    messages,
    errors,
    updateFlash,
  }
};

export default useFlash;
