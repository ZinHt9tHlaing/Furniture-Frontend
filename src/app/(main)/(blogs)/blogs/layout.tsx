import type { ReactNode } from "react";

export default function BlogRootLayoutPage({
  children,
}: {
  children: ReactNode;
}) {
  return <main>{children}</main>;
}
