"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import RatingConverter from "@/components/products/RatingConverter";
import AddToFavorite from "@/components/products/AddToFavorite";
import BackButton from "@/components/back-button";
import AddToCartForm from "@/components/products/AddToCartForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Icons } from "@/components/Icons";

const ProductDetailPage = () => {
  const { productId } = useParams();

  const plugin = useMemo(
    () => Autoplay({ delay: 2000, stopOnInteraction: true }),
    [],
  );

  const product = products.find((product) => product.id === productId);

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <BackButton label="All Products" />

      {/* Carousel */}
      <section className="my-6 flex flex-col gap-8 md:flex-row md:gap-16">
        <Carousel plugins={[plugin]} className="w-full md:w-1/2">
          <CarouselContent>
            {product?.images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Image
                    src={img}
                    alt={product.name}
                    loading="eager"
                    decoding="async"
                    preload={false}
                    className="size-full rounded-md object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <Separator className="mt-4 md:hidden" />

        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">{product?.name}</h2>
            <p className="text-muted-foreground text-base">
              {formatPrice(Number(product?.price))}
            </p>
          </div>

          <Separator className="my-1.5" />

          <p className="text-muted-foreground text-base">
            {product?.inventory} in stock
          </p>
          <div className="flex items-center justify-between">
            <RatingConverter ratingCount={Number(product?.rating)} />
            <AddToFavorite productId={String(product?.id)} rating={Number()} />
          </div>

          {/* Add To Cart Form */}
          <AddToCartForm canBuy={product?.status === "active" ? true : false} />

          <Separator className="my-5" />

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {product?.description ??
                  "No description is available for this product."}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Scroll */}
      <section className="space-y-6 overflow-hidden">
        <h2 className="line-clamp-1 text-3xl font-bold">
          More Products from Furniture Shop
        </h2>
        <ScrollArea className="pb-8">
          <div className="flex gap-4">
            {products.slice(0, 4).map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                className="min-w-[260px]"
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    </div>
  );
};

export default ProductDetailPage;
