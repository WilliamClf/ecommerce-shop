import { Button } from "@/components/ui/button";
import { useCategories } from "../hooks/use-category";
import { useEffect, useState } from "react";
import type { CategoryDTO } from "../dtos/category.dto";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Sparkles, Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { CartButton } from "@/components/ui/cart-button";
import { Input } from "@/components/ui/input";

export function CategoryMenu() {
    const { data: categories } = useCategories();
    const [visibleItems, setVisibleItems] = useState<CategoryDTO[]>([]);
    const [hiddenItems, setHiddenItems] = useState<CategoryDTO[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategoryId = searchParams.get("categoryId");
    const searchQuery = searchParams.get("search") || "";
    const [searchInput, setSearchInput] = useState(searchQuery);

    useEffect(() => {
        if (categories) {
            setVisibleItems(categories.slice(0, 5));
            setHiddenItems(categories.slice(5));
        }
    }, [categories]);

    const handleCategoryClick = (categoryId?: string) => {
        const newParams: Record<string, string> = {};
        if (categoryId) newParams.categoryId = categoryId;
        if (searchQuery) newParams.search = searchQuery;
        setSearchParams(newParams);
    };

    const handleSearchChange = (value: string) => {
        setSearchInput(value);
        const newParams: Record<string, string> = {};
        if (value.trim()) newParams.search = value.trim();
        if (selectedCategoryId) newParams.categoryId = selectedCategoryId;
        setSearchParams(newParams);
    };

    const clearSearch = () => {
        setSearchInput("");
        const newParams: Record<string, string> = {};
        if (selectedCategoryId) newParams.categoryId = selectedCategoryId;
        setSearchParams(newParams);
    };

    const isActive = (categoryId?: string) => {
        if (!categoryId && !selectedCategoryId) return true;
        return categoryId === selectedCategoryId;
    };

    return (
        <nav className="w-full py-8 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">

                {/* Linha 1: Nossos Produtos à esquerda / Categorias + Carrinho à direita */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    {/* Nossos Produtos */}
                    <div className="flex items-start gap-3 min-w-[220px]">
                        <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex flex-col">
                            <h5 className="font-bold text-3xl text-gray-900">
                                Lojão W&M
                            </h5>
                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Novos produtos todos os dias
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center flex-wrap gap-2 justify-start md:justify-end">

                        <Button
                            variant="ghost"
                            onClick={() => handleCategoryClick()}
                            className={`rounded-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-md ${isActive()
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                                }`}
                        >
                            Todos
                        </Button>

                        {visibleItems.map((category) => (
                            <Button
                                key={category.id}
                                variant="ghost"
                                onClick={() => handleCategoryClick(category.id)}
                                className={`rounded-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-md ${isActive(category.id)
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                    : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                                    }`}
                            >
                                {category.name}
                            </Button>
                        ))}

                        {hiddenItems.length > 0 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="rounded-full px-6 gap-2 border-2 hover:scale-105 hover:shadow-md"
                                    >
                                        Mais
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-56 rounded-2xl shadow-xl border-2 p-2"
                                >
                                    {hiddenItems.map((category) => (
                                        <DropdownMenuItem
                                            key={category.id}
                                            onClick={() => handleCategoryClick(category.id)}
                                            className={`rounded-xl px-4 py-3 ${isActive(category.id)
                                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                                : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                                                }`}
                                        >
                                            {category.name}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}

                        <CartButton />
                    </div>
                </div>

                {/* Linha 2: Barra de busca (embaixo de tudo) */}
                <div className="relative w-full max-w-xl">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                    <Input
                        type="text"
                        placeholder="Buscar produtos..."
                        value={searchInput}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10 pr-10 h-10 rounded-full border-2"
                    />

                    {searchInput && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={clearSearch}
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full hover:bg-gray-100"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-2"></div>
            </div>
        </nav>
    );
}