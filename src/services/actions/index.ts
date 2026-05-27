import { AxiosError } from "axios";
import { z } from "zod";
import { apiClient, authApi } from "@/api";
import { loginSchema } from "@/schemas/authSchema";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    const response = await apiClient.post("/login", values);

    if (response.status !== 200) {
      return { error: response.data || "Login Failed!" };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data.message || "Login Failed!",
      };
    }
    return { success: false, error: "Internal Server Error!" };
  }
};

export const logoutAction = async () => {
  try {
    const response = await authApi.post("/logout");

    if (response.status !== 200) {
      return { error: response.data || "Logout Failed!" };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data.message || "Logout Failed!",
      };
    }
    return { success: false, error: "Internal Server Error!" };
  }
};

