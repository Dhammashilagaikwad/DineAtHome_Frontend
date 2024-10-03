// toastService.js
import { toast } from "react-toastify";

const defaultToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const toastService = {
  success: (message, options = {}) => {
    toast.success(message, {
      ...defaultToastOptions,
      ...options,
    });
  },

  warn: (message, options = {}) => {
    toast.warn(message, {
      ...defaultToastOptions,
      ...options,
    });
  },

  error: (message, options = {}) => {
    toast.error(message, {
      ...defaultToastOptions,
      ...options,
    });
  },

  info: (message, options = {}) => {
    toast.info(message, {
      ...defaultToastOptions,
      ...options,
    });
  },
};

export default toastService;
