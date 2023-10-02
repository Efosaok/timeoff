import React, { useState } from "react"

const useInputs = (defaults: Record<string, any>) => {
  const [inputs, setInputs] = useState(defaults);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const { type, name, value, checked } = event.target;

    let finalValue = value;
  
    const newInputs = { ...inputs };
    if (type === 'checkbox' && !checked) newInputs[name] = undefined;
    else newInputs[name] = finalValue;

    setInputs(newInputs);
  }

  const clearInputs = () => setInputs(defaults);

  return {
    inputs,
    onChange,
    clearInputs,
  }
}

export default useInputs;
