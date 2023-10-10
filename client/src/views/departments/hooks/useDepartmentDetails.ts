import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import fetchInstance from "../../../axios/fetchInstance";
import useFlash from "../../../hooks/useFlash";

const useDepartmentDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const fetchUrl = `/settings/departments/edit/${id}`;

  const { data, isLoading, error: detailsError } = useQuery(fetchUrl, () => fetchInstance.get(fetchUrl))

  const deleteFn = () => fetchInstance.post(`/settings/departments/delete/${id}`);

  const { errors, messages, updateFlash } = useFlash();
  const { mutate, isLoading: deleting } = useMutation<any, any>(deleteFn, {
    onSuccess: () => {
      navigate('/departments');
      toast.success('Department deleted sucessfully');
    },
    onError: (err: any) => {
      updateFlash(err?.response?.data?.errors, 'errors');
    },
  });

  const deleteDepartment = () => mutate();

  const res = data?.data;

  return {
    res,
    isLoading,
    deleteDepartment,
    deleting,
    errors,
    messages,
    detailsError,
    updateFlash,
  }
};

export default useDepartmentDetails;
