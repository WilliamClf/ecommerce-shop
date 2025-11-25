import { CategoryMenu } from "@/cases/categories/components/category-menu";
import { ProductCard } from "@/cases/products/components/product-card";
import { useProducts } from "@/cases/products/hooks/use-product";
import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export function ProductListPage() {
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId");
    const searchQuery = searchParams.get("search");

    const { data: products, isLoading } = useProducts(categoryId || undefined);

    // Filtrar produtos localmente por busca
    const filteredProducts = useMemo(() => {
        if (!products) return [];

        if (!searchQuery) return products;

        const query = searchQuery.toLowerCase().trim();

        return products.filter((product) => {
            const matchName = product.name.toLowerCase().includes(query);
            const matchDescription = product.description?.toLowerCase().includes(query) || false;

            return matchName || matchDescription;
        });
    }, [products, searchQuery]);

    return (
        <>
            <CategoryMenu />
            <section className="flex flex-col px-4 max-w-7xl mx-auto">
                {isLoading ? (
                    <div className="flex justify-center items-center mt-8 py-12">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-500">Carregando produtos...</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex mt-8 gap-8 flex-wrap">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    to={`/product/${product.id}`}
                                >
                                    <ProductCard product={product} />
                                </Link>
                            ))
                        ) : (
                            <div className="w-full flex flex-col items-center justify-center py-16 gap-4">
                                <div className="text-6xl">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-700">
                                    Nenhum produto encontrado
                                </h3>
                                <p className="text-gray-500">
                                    {searchQuery
                                        ? `Nenhum resultado para "${searchQuery}"`
                                        : "Tente selecionar outra categoria"
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </>
    )
}