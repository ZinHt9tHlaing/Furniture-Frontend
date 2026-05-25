"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import { cn } from "@/lib/utils";

type VariantType =
  | "link"
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "destructive";

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: VariantType;
}

const BackButton = ({
  label,
  variant,
  className,
  ...props
}: BackButtonProps) => {
  const navigate = useRouter();

  return (
    <Button
      variant={variant || "outline"}
      onClick={() => navigate.back()}
      className={cn(
        "group mt-8 mb-6 cursor-pointer duration-200 active:ring-1 active:ring-gray-500",
        className,
      )}
      {...props}
    >
      <Icons.arrowLeft className="duration-200 group-hover:-translate-x-1" />
      {label}
    </Button>
  );
};

export default BackButton;
