import { useQuery } from "@tanstack/react-query";
import type { ProductDTO } from "../dtos/product.dto";

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

// Função para buscar um produto específico por ID
async function fetchProductById(id: string): Promise<ProductDTO> {
    const response = await fetch(`http://localhost:3000/products/${id}`);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Produto não encontrado');
        }
        throw new Error('Erro ao buscar produto');
    }

    return response.json();
}

// Hook que aceita categoryId opcional para filtrar produtos
export function useProducts(categoryId?: string) {
    return useQuery({
        queryKey: ['products', categoryId],
        queryFn: () => fetchProducts(categoryId),
    });
}

// Hook para buscar um produto específico por ID
export function useProductById(id: string) {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id),
        enabled: !!id, // Só executa se tiver ID
    });
}