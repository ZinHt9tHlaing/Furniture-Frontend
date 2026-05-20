"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { newLetterSchema } from "@/schemas/newLetterSchema";
import { toast } from "sonner";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Icons } from "./Icons";

const NewLetterForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof newLetterSchema>>({
    resolver: zodResolver(newLetterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof newLetterSchema>) => {
    console.log(values);
    form.reset();
    setLoading(true);
    toast.success("Thanks for joining our newsletter!");
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="relative w-64 pr-8 lg:w-full lg:pr-0"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-1">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                aria-invalid={fieldState.invalid}
                placeholder="example@gmail.com"
                autoComplete="off"
                className="relative pr-12"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        size="icon"
        className="group absolute top-8.25 right-9 z-20 size-7 cursor-pointer duration-200 active:scale-90 lg:right-[3.5px]"
      >
        {loading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <Icons.paperPlane
            className="size-4 duration-200 group-hover:-rotate-12"
            aria-hidden="true"
          />
        )}
        <span className="sr-only">Join newsletter</span>
      </Button>
    </form>
  );
};

export default NewLetterForm;
