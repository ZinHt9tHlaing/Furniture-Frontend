"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <main className="mx-auto my-32 flex flex-1 items-center">
        <Card className="w-87.5 max-w-md rounded-2xl py-3 shadow-lg md:w-125 lg:w-125">
          <CardHeader className="flex flex-col items-center">
            <Icons.exclamation
              className="mb-2 size-12 text-red-500"
              aria-hidden="true"
            />
            <CardTitle className="text-center text-2xl font-bold">
              Page Not Found
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-center text-gray-600 dark:text-gray-300">
              The page you’re looking for doesn’t exist or has been moved.
            </p>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button
              asChild
              className="rounded-xl bg-red-500 shadow-md duration-200 hover:bg-red-600 active:ring-2 active:ring-red-500"
            >
              <Link href="/">Go Back Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
