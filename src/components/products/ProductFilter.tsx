"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { productFilterSchema } from "@/schemas/productSchema";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Category } from "@/types";
import { Button } from "../ui/button";

interface ProductFilterProps {
  filterList: { categories: Category[]; types: Category[] };
}

type FormValues = z.infer<typeof productFilterSchema>;

export function ProductFilter({ filterList }: ProductFilterProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(productFilterSchema),
    defaultValues: {
      categories: [],
      types: [],
    },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* categories */}
        <Controller
          name="categories"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div>
                <FieldLabel className="text-base">Furniture Made By</FieldLabel>
              </div>
              {filterList.categories.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row items-center space-y-0 space-x-3"
                >
                  <Checkbox
                    id={item.id}
                    name={item.id}
                    checked={field.value?.includes(item.id.toString())}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...field.value, item.id.toString()])
                        : field.onChange(
                            field.value?.filter(
                              (value) => value !== item.id.toString(),
                            ),
                          );
                    }}
                  />
                  <FieldLabel htmlFor={item.id} className="text-sm font-normal">
                    {item.label}
                  </FieldLabel>
                </div>
              ))}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* types */}
        <Controller
          name="types"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div>
                <FieldLabel className="text-base">Furniture Types</FieldLabel>
              </div>
              {filterList.types.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row items-center space-y-0 space-x-3"
                >
                  <Checkbox
                    id={item.id}
                    name={item.id}
                    checked={field.value?.includes(item.id.toString())}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...field.value, item.id.toString()])
                        : field.onChange(
                            field.value?.filter(
                              (value) => value !== item.id.toString(),
                            ),
                          );
                    }}
                  />
                  <FieldLabel htmlFor={item.id} className="text-sm font-normal">
                    {item.label}
                  </FieldLabel>
                </div>
              ))}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Buttons */}
      <div className="mt-4 flex items-center gap-2">
        <Button
          type="submit"
          variant={"outline"}
          className="cursor-pointer duration-200 active:ring-1 active:ring-gray-500"
        >
          Filter
        </Button>
        <Button
          type="button"
          variant={"destructive"}
          className="cursor-pointer duration-200 active:ring-1 active:ring-red-500"
          onClick={() => {
            form.reset({ categories: [], types: [] });
          }}
        >
          Clear
        </Button>
      </div>
    </form>
  );
}
