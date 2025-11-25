import type { ProductDTO } from "@/cases/products/dtos/product.dto";

export interface CartItem {
    product: ProductDTO;
    quantity: number;
    subtotal: number;
}