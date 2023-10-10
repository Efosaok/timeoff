import { ChangeEvent, useState } from "react";

const useSupervisorsSelector = (supervisors: string[]) => {
  const [selectedSupervisors, setSelectedSupervisors] = useState([...supervisors]);

  const onSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value
    const isSelected = selectedSupervisors.includes(id);
    if (isSelected) setSelectedSupervisors(selectedSupervisors.filter((supId) => supId !== id))
    else setSelectedSupervisors([...selectedSupervisors, id]);
  }

  return {
    onSelect,
    selectedSupervisors
  }
};

export default useSupervisorsSelector;
