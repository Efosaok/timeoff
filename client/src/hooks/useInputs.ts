import React, { useState } from "react"

const useInputs = (defaults: Record<string, string>) => {
  const [inputs, setInputs] = useState(defaults);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setInputs({ ...inputs, [event.target.name]: event.target.value })

  const clearInputs = () => setInputs(defaults);

  return {
    inputs,
    onChange,
    clearInputs,
  }
}

export default useInputs;
