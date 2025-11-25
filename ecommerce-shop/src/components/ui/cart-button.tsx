import { useCart } from "@/cases/cart/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function CartButton() {
    const { openCart, getTotalItems } = useCart();
    const totalItems = getTotalItems();

    return (
        <Button
            onClick={openCart}
            variant="outline"
            className="relative h-10 px-4 border-2 hover:bg-gray-50"
        >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                    {totalItems}
                </span>
            )}
        </Button>
    );
}