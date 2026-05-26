"use client";

import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { cartItems } from "@/data/carts";
import CartItem from "../cart/CartItem";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Icons } from "../Icons";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CartSheet() {
  const itemCount = 4;
  const amountTotal = 10;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          variant="outline"
          className={cn("relative cursor-pointer")}
          aria-label="Open cart"
        >
          <Badge className="absolute -top-2 -right-2 size-2 justify-center rounded-full bg-red-500 p-2.5 text-white dark:bg-red-600">
            {itemCount}
          </Badge>
          <Icons.cart className="size-4" aria-hidden="true" />
          <span className="sr-only">Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-full text-center text-2xl md:max-w-lg"
        aria-describedby={undefined}
      >
        <SheetHeader>
          <SheetTitle>
            {itemCount > 0 ? `Cart - ${itemCount}` : "Empty cart"}
          </SheetTitle>
        </SheetHeader>

        <Separator />

        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="h-[68vh] pb-8">
              <div className="flex-1">
                {cartItems.map((cart) => (
                  <CartItem key={cart.id} cart={cart} />
                ))}
              </div>
            </ScrollArea>

            <div className="mx-5 space-y-4">
              <Separator />

              <div className="mx-4 space-y-1.5 text-base">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>{formatPrice(amountTotal.toFixed(2))}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    type="submit"
                    asChild
                    className="w-full duration-150 active:ring-1 active:ring-gray-500"
                  >
                    <Link href="/checkout" aria-label="Check out">
                      Continue to checkout
                    </Link>
                  </Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <Icons.cart className="text-muted-foreground mb-4 size-16" />
            <h3 className="text-muted-foreground text-xl font-medium">
              Your cart is empty
            </h3>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CartSheet;
