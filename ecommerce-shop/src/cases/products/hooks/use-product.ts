import { useQuery } from "@tanstack/react-query";
import type { ProductDTO } from "../dtos/product.dto";
import { ProductService } from "../services/product.service";

// Função para buscar produtos com filtro opcional de categoria
async function fetchProducts(categoryId?: string): Promise<ProductDTO[]> {
    const url = categoryId
        ? `http://localhost:3000/products?categoryId=${categoryId}`
        : 'http://localhost:3000/products';

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
    }

    return response.json();
}

// Hook que aceita categoryId opcional para filtrar produtos
export function useProducts(categoryId?: string) {
    return useQuery({
        queryKey: ['products', categoryId], // Cache separado por categoria
        queryFn: () => fetchProducts(categoryId),
    });
}

export function useProduct(id: string) {
    return useQuery<ProductDTO>({
        queryKey: ['product', id],
        queryFn: () => ProductService.getById(id),
        enabled: !!id
    });
}