import axios from "axios";

const apiClient = axios.create({
  baseURL: "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";

    if (status === 401 && typeof window !== "undefined") {
      const path = window.location.pathname;
      if (!path.startsWith("/login")) {
        window.location.href = `/login?from=${encodeURIComponent(path)}`;
      }
    }

    return Promise.reject(new Error(message));
  }
);

export default apiClient;
