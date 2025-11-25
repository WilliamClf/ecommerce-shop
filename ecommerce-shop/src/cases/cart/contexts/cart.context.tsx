import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import type { CartItem } from "../dtos/cart.dto";

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    addToCart: (product: ProductDTO) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
    openCart: () => void;
    closeCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "lojao-wm-cart";

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Carregar carrinho do localStorage ao iniciar
    useEffect(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                console.error("Erro ao carregar carrinho:", error);
            }
        }
    }, []);

    // Salvar carrinho no localStorage sempre que mudar
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addToCart = (product: ProductDTO) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.product.id === product.id
            );

            // Garantir que price seja número
            const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;

            if (existingItem) {
                // Se já existe, aumenta quantidade
                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                            subtotal: (item.quantity + 1) * price,
                        }
                        : item
                );
            } else {
                // Se não existe, adiciona novo item
                return [
                    ...currentItems,
                    {
                        product,
                        quantity: 1,
                        subtotal: price,
                    },
                ];
            }
        });
        setIsOpen(true); // Abre o carrinho ao adicionar
    };

    const removeFromCart = (productId: string) => {
        setItems((currentItems) =>
            currentItems.filter((item) => item.product.id !== productId)
        );
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setItems((currentItems) =>
            currentItems.map((item) => {
                if (item.product.id === productId) {
                    // Garantir que price seja número
                    const price = typeof item.product.price === 'string'
                        ? parseFloat(item.product.price)
                        : item.product.price;

                    return {
                        ...item,
                        quantity,
                        subtotal: quantity * price,
                    };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const getTotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return items.reduce((total, item) => total + item.subtotal, 0);
    };

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    return (
        <CartContext.Provider
            value={{
                items,
                isOpen,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalItems,
                getTotalPrice,
                openCart,
                closeCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}