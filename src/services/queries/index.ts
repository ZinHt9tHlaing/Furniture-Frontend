"use server";

import { redirect } from "next/navigation";
import { authApi } from "@/api";
import { AxiosError } from "axios";

export const homeQueries = async () => {
  try {
    const response = await authApi.get("/user/profile/my-photo");

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        console.error("error:", error.response.data);
        redirect("/login");
      }

      console.error("Server API fetch error:", error.message);
    }

    throw error;
  }
};
