"use client";

import { AxiosError } from "axios";
import { z } from "zod";
import { apiClient, authApi } from "@/api";
import {
  confirmPasswordSchema,
  loginSchema,
  otpSchema,
  registerSchema,
} from "@/schemas/authSchema";
import useAuthStore, { Status } from "@/store/auth/authStore";
import {
  ConfirmPasswordResponses,
  LoginResponses,
  RegisterResponse,
  VerifyOtpResponse,
} from "@/types/response";

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

    const response = await apiClient.post<LoginResponses>("/login", values);

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
  const authStore = useAuthStore.getState();

  try {
    const response = await authApi.post("/logout");

    if (response.status !== 200) {
      return { error: response.data || "Logout Failed!" };
    }

    // clear client state
    authStore.clearAuth();

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

export const registerAction = async (
  values: z.infer<typeof registerSchema>,
) => {
  const authStore = useAuthStore.getState();

  try {
    const response = await apiClient.post<RegisterResponse>(
      "/register",
      values,
    );
    if (response.status !== 200) {
      return { error: response.data || "Sending OTP Failed!" };
    }

    // client state
    authStore.setAuth(response.data.phone, response.data.token, Status.otp);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data.message || "Sending OTP Failed!",
      };
    }
    return { success: false, error: "Internal Server Error!" };
  }
};

export const verifyOtpAction = async (values: z.infer<typeof otpSchema>) => {
  const authStore = useAuthStore.getState();
  const credentials = {
    phone: authStore.phone,
    otp: values.otp,
    token: authStore.token,
  };

  try {
    const response = await apiClient.post<VerifyOtpResponse>(
      "/verify-otp",
      credentials,
    );

    if (response.status !== 200) {
      return { error: response.data || "OTP Verification Failed!" };
    }

    // client state
    authStore.setAuth(response.data.phone, response.data.token, Status.confirm);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data.message || "OTP Verification Failed!",
      };
    }
    return { success: false, error: "Internal Server Error!" };
  }
};

export const confirmPasswordAction = async (
  values: z.infer<typeof confirmPasswordSchema>,
) => {
  const authStore = useAuthStore.getState();
  const credentials = {
    phone: authStore.phone,
    password: values.password,
    token: authStore.token,
  };

  try {
    const response = await apiClient.post<ConfirmPasswordResponses>(
      "/confirm-password",
      credentials,
    );

    if (response.status !== 201) {
      return { error: response.data || "Registration Failed!" };
    }

    // Clear client state
    authStore.clearAuth();

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data.message || "Registration Failed!",
      };
    }
    return { success: false, error: "Internal Server Error!" };
  }
};
