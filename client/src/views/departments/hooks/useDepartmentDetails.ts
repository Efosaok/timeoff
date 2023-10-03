import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import fetchInstance from "../../../axios/fetchInstance";

const useDepartmentDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const fetchUrl = `/settings/departments/edit/${id}`;

  const { data, isLoading, error: detailsError } = useQuery(fetchUrl, () => fetchInstance.get(fetchUrl))

  const deleteFn = () => fetchInstance.post(`/settings/departments/delete/${id}`);

  const { mutate, isLoading: deleting, error } = useMutation<any, any>(deleteFn, {
    onSuccess: (data) => {
      navigate('/departments');
      toast.success('Department deleted sucessfully');
    },
  });

  const deleteDepartment = () => mutate();

  const res = data?.data;
  const errors = error?.response?.data?.errors;

  return {
    res,
    isLoading,
    deleteDepartment,
    deleting,
    errors,
    detailsError,
  }
};

export default useDepartmentDetails;
