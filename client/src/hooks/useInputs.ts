import moment from "moment";
import React, { useState } from "react"

const useInputs = (defaults: Record<string, any>, ignoreFormat?: boolean) => {
  const [inputs, setInputs] = useState(defaults);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const { type, name, value, checked } = event.target;

    let finalValue = value;
  
    const newInputs = { ...inputs };
    if (type === 'checkbox' && !checked) finalValue = undefined;
    if (type === 'date' && !ignoreFormat) finalValue = moment(value).format('MM/DD/YY')
    newInputs[name] = finalValue;

    setInputs(newInputs);
  }

  const clearInputs = () => setInputs(defaults);

  return {
    inputs,
    onChange,
    clearInputs,
    setInputs,
  }
}

export default useInputs;
