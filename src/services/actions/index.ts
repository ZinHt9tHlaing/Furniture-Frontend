import { AxiosError } from "axios";
import { z } from "zod";
import { apiClient, authApi } from "@/api";
import { loginSchema } from "@/schemas/authSchema";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  // Converting object into form Data because the API expects form Data
  // const credentials = Object.fromEntries(Object.entries(values));

  try {
    // const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(credentials), // Convert to JSON
    //   credentials: "include", // send httpOnly cookies
    // });

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
