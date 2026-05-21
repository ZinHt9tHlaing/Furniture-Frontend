import type { ReactNode } from "react";

export default function ProductRootLayoutPage({
  children,
}: {
  children: ReactNode;
}) {
  return <main>{children}</main>;
}
