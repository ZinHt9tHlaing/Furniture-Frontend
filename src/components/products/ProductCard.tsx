import Link from "next/link";
import Image from "next/image";

import { Product } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "../ui/button";
import { Icons } from "../Icons";
import { cn, formatPrice } from "@/lib/utils";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <Card className={cn("size-full overflow-hidden rounded-lg", className)}>
      <Link href={`products/${product.id}`} aria-label={product.name}>
        <CardHeader className="gap-0 border-b">
          <AspectRatio ratio={1 / 1} className="bg-muted">
            <Image
              src={product.images[0]}
              alt={product.name}
              loading="eager"
              className="size-full object-cover transition-all duration-500 ease-in-out lg:hover:scale-105"
            />
          </AspectRatio>
        </CardHeader>
      </Link>

      <CardContent className="space-y-1.5 p-4">
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
        <CardDescription className="text-own line-clamp-2 text-sm">
          {formatPrice(product.price)}
          {product.discount > 0 && (
            <span className="ml-2 font-light line-through">
              {formatPrice(product.discount)}
            </span>
          )}
        </CardDescription>
      </CardContent>
      <CardFooter>
        {product.status === "sold" ? (
          <Button
            size={"sm"}
            disabled={true}
            aria-label="Sold Out"
            className="h-8 w-full cursor-not-allowed rounded-sm font-bold select-none"
          >
            Sold Out
          </Button>
        ) : (
          <Button
            aria-label="Add to cart"
            size={"sm"}
            className="bg-own h-8 w-full cursor-pointer rounded-sm text-center font-bold duration-150 hover:bg-emerald-900 active:ring-1 active:ring-gray-500 disabled:cursor-not-allowed dark:text-white"
          >
            <Icons.plus className="" />
            Add To Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
