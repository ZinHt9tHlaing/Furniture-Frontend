import { cookies } from "next/headers";

export async function AuthGuard() {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken");

  if (!token) {
    return false;
  }

  return true;
}
