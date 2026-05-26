import Image from "next/image";
import { Cart } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Separator } from "../ui/separator";
import Editable from "./Editable";

interface CartItemProps {
  cart: Cart;
}

const CartItem = ({ cart }: CartItemProps) => {
  return (
    <div className="mx-4 space-y-3">
      <div className="mt-4 mb-2 flex gap-4">
        <Image
          src={String(cart.image.url)}
          alt={cart.name}
          loading="lazy"
          decoding="async"
          width={200}
          height={200}
          className="w-16 object-cover"
        />

        <div className="flex flex-col space-y-1">
          <h3 className="line-clamp-1 text-start text-sm font-medium">
            {cart.name}
          </h3>
          <span className="text-muted-foreground text-start text-xs">
            {formatPrice(cart.price)} x {cart.quantity} ={" "}
            {formatPrice((cart.price * cart.quantity).toFixed(2))}
          </span>
          <span className="text-muted-foreground line-clamp-1 text-xs capitalize">
            {`${cart.category} / ${cart.subcategory}`}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <Editable quantity={cart.quantity} />
      </div>
      <Separator />
    </div>
  );
};

export default CartItem;
