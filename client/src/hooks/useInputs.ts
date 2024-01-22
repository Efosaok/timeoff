import moment from "moment";
import React, { ReactHTML, useState } from "react"

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

  const clearInputs = (
    e?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any> | Record<string, any>,
    dateFieldIds?: string[]
  ) => {
    setInputs(defaults);
    dateFieldIds?.forEach((id) => {
      const dateInputField = document.querySelector(id) as HTMLInputElement;
      dateInputField.value = '';
    });
  };

  return {
    inputs,
    onChange,
    clearInputs,
    setInputs,
  }
}

export default useInputs;
