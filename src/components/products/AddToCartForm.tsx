"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { quantitySchema } from "@/schemas/productSchema";
import { Icons } from "../Icons";

import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface canBuyProps {
  canBuy: boolean;
}

const AddToCartForm = ({ canBuy }: canBuyProps) => {
  const form = useForm<z.infer<typeof quantitySchema>>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit = (values: z.infer<typeof quantitySchema>) => {
    console.log(values);
    // call api
    toast.success("Product is added to cart successfully.");
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex max-w-[260px] flex-col gap-4"
    >
      <div className="flex w-32 items-center">
        {/* Minus Button */}
        <Button
          type="button"
          variant={"outline"}
          size={"icon"}
          className="size-8 shrink-0 cursor-pointer rounded-r-none duration-200 active:ring-1 active:ring-gray-500"
        >
          <Icons.minus className="size-3" aria-hidden="true" />
          <span className="sr-only">Remove one item</span>
        </Button>

        {/* Quantity input */}
        <FieldGroup>
          <Controller
            name="quantity"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-0">
                <FieldLabel htmlFor="quantity" className="sr-only">
                  Quantity
                </FieldLabel>
                <Input
                  id="quantity"
                  type="number"
                  inputMode="numeric" // show numeric keyboard on mobile
                  min={1}
                  max={9999}
                  className="h-8 w-16 [appearance:textfield] rounded-none border-x-0 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Plus Button */}
        <Button
          type="button"
          variant={"outline"}
          size={"icon"}
          className="size-8 shrink-0 cursor-pointer rounded-l-none duration-150 active:ring-1 active:ring-gray-500"
        >
          <Icons.plus className="size-3" aria-hidden="true" />
          <span className="sr-only">Add one item</span>
        </Button>
      </div>

      <div className="flex items-center space-x-2.5">
        {/* Buy Now */}
        <Button
          type="button"
          aria-label="Buy Now"
          size={"sm"}
          className={cn(
            "bg-own w-[45%] cursor-pointer font-bold duration-200 active:ring-1 active:ring-gray-500",
            !canBuy &&
              "bg-muted-foreground pointer-events-none cursor-not-allowed",
          )}
        >
          Buy Now
        </Button>

        {/* Add To Cart */}
        <Button
          type="submit"
          aria-label="Add To Cart"
          variant={canBuy ? "outline" : "default"}
          size={"sm"}
          className="w-[45%] cursor-pointer duration-150 active:ring-1 active:ring-gray-500"
        >
          Add to Cart
        </Button>
      </div>
    </form>
  );
};

export default AddToCartForm;
