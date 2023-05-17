import { toast } from "react-toastify";

export const HandleHttpError = (error, navigate, redirectPath) => {
  if (error.response?.status === 401 || error.response?.status === 403) {
    navigate(redirectPath);
    localStorage.clear();
  }

  const message = typeof error === "string" ? error : error.response?.data.message || error.message;
  toast.error(message, {
    draggable: true,
    position: toast.POSITION.TOP_RIGHT,
  });
};
