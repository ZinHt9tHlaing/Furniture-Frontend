"use client";

import Link from "next/link";
import { otpSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import useAuthStore, { Status } from "@/store/auth/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyOtpAction } from "@/services/actions/auth";
import { toast } from "sonner";

export function InputOTPForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const status = useAuthStore((state) => state.status);
  const isMounted = useAuthStore((state) => state.isMounted);
  const setIsMounted = useAuthStore((state) => state.setIsMounted);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }
    if (status !== Status.otp) {
      router.replace("/register");
    }
  }, [status, router, isMounted]);

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof otpSchema>) {
    const result = await verifyOtpAction(values);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    form.reset();
    toast.success(result.data?.message);
    router.push("/register/confirm-password");
  }

  if (!isMounted || status !== Status.otp) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Link
            href={"#"}
            className="flex flex-col items-center gap-2 font-medium"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <Icons.logo className="mr-2 h-6 w-6" aria-hidden="true" />
            </div>
            <span className="sr-only">OTP Verify Form</span>
          </Link>
          <h1 className="mb-6 text-xl font-bold">
            We&apos;ve sent OTP to your phone.
          </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FieldGroup>
              {/* phone */}
              <Controller
                name="otp"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1"
                  >
                    <FieldLabel>OTP - One-Time Password</FieldLabel>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      //   pattern={REGEXP_ONLY_DIGITS} // Only allow digits ( number 0-9 )
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <FieldDescription>
                      Please enter the one-time password sent to your phone.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer duration-200 active:ring-1 active:ring-gray-500"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span className="animate-pulse">Verifying...</span>
                </>
              ) : (
                "Verify"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
