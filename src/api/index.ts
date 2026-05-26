import axios from "axios";
import { ENV } from "@/config/env";

export const api = axios.create({
  baseURL: ENV.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // send httpOnly cookies
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle unauthorized error (401) by redirecting to login page
    if (typeof window !== "undefined" && error.response?.status === 401) {
      window.location.href = `/login?redirect=${encodeURIComponent(
        window.location.pathname,
      )}`; // if token expired, it will redirect to login page and store current page to redirect after login
    }
    return Promise.reject(error);
  },
);

// for auth, not include interceptors
export const authApi = axios.create({
  baseURL: ENV.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // send httpOnly cookies
});
