"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";

interface ProductProps {
  products: Product[];
}

export default function CarouselCard({ products }: ProductProps) {
  const plugin = React.useMemo(
    () => Autoplay({ delay: 2000, stopOnInteraction: true }),
    [],
  );

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[plugin]}
      className="w-full"
      onMouseEnter={() => plugin.stop()}
      onMouseLeave={() => plugin.reset()}
    >
      <CarouselContent className="-ml-1">
        {products.map((product, index) => (
          <CarouselItem key={index} className="pl-1 lg:basis-1/3">
            <div className="flex gap-4 p-4 lg:px-4">
              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="h-28 rounded-md md:w-40 lg:w-full"
                />
              ) : null}
              <div className="">
                <h3 className="line-clamp-1 text-sm font-bold">
                  {product.name}
                </h3>
                <p className="my-2 line-clamp-2 text-sm text-gray-600">
                  {product.description}
                </p>
                <Link
                  href={`/products/${product.id}`}
                  className="text-own text-sm font-semibold duration-200 hover:underline active:scale-90"
                >
                  Read more
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="mx-0 lg:mx-4" />
      <CarouselNext className="mx-0 lg:mx-4" />
    </Carousel>
  );
}
