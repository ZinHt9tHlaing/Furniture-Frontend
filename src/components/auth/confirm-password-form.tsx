"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { confirmPasswordSchema } from "@/schemas/authSchema";
import { PasswordInput } from "./password-input";
import { Icons } from "../Icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useRouter } from "next/navigation";
import useAuthStore, { Status } from "@/store/auth/authStore";
import { useEffect } from "react";
import { confirmPasswordAction } from "@/services/actions/auth";
import { toast } from "sonner";

function ConfirmPasswordForm({
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
    if (status !== Status.confirm) {
      router.replace("/register");
    }
  }, [status, router, isMounted]);

  const form = useForm<z.infer<typeof confirmPasswordSchema>>({
    resolver: zodResolver(confirmPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof confirmPasswordSchema>) => {
    const result = await confirmPasswordAction(values);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    form.reset();
    toast.success(result.data?.message);
    router.push("/");
  };

  if (!isMounted || status !== Status.confirm) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="flex flex-col gap-6">
        <CardHeader>
          <div className="flex flex-col items-center gap-2">
            <Link
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <Icons.logo className="mr-2 h-6 w-6" aria-hidden="true" />
              </div>
              <span className="sr-only">Confirm Password</span>
            </Link>
            <CardTitle className="text-xl font-bold">
              Please confirm your password
            </CardTitle>
            <CardDescription className="text-center text-sm">
              Passwords must be 8 digits long and contain only numbers. They
              must match.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {" "}
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  {/* password */}
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="space-y-1"
                      >
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <PasswordInput
                          id="password"
                          aria-invalid={fieldState.invalid}
                          inputMode="numeric" // show numeric keyboard on mobile
                          placeholder="*********"
                          autoComplete="off"
                          {...field}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* password */}
                  <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="space-y-1"
                      >
                        <FieldLabel htmlFor="confirmPassword">
                          Confirm Password
                        </FieldLabel>
                        <PasswordInput
                          id="confirmPassword"
                          aria-invalid={fieldState.invalid}
                          inputMode="numeric" // show numeric keyboard on mobile
                          placeholder="*********"
                          autoComplete="off"
                          {...field}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                <div className="grid gap-4">
                  <Button
                    type="submit"
                    className="mt-4 w-full cursor-pointer duration-200 active:scale-95"
                    disabled={form.formState.isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Confirm"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ConfirmPasswordForm;
