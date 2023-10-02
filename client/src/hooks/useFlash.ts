import { useState } from "react"
import { FLASH_DEFAULTS } from "../utils/constants";

interface FlashProps {
  messages?: string[];
  errors?: string[];
}
const useFlash = () => {
  const [flash, setFlash] = useState<FlashProps>(FLASH_DEFAULTS);

  const updateFlash = (messages: string[], type: keyof FlashProps = 'messages') => setFlash({ ...FLASH_DEFAULTS, [type]: messages });
  const { messages, errors } = flash;

  return {
    messages,
    errors,
    updateFlash,
  }
};

export default useFlash;
