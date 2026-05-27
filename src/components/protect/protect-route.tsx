"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
