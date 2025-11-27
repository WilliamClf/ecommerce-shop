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
import { UserMenu } from "@/cases/auth/components/user-menu";
import { Input } from "@/components/ui/input";

export function CategoryMenu() {
    const { data: categories, isLoading } = useCategories();
    const [visibleItems, setVisibleItems] = useState<CategoryDTO[]>([]);
    const [hiddenItems, setHiddenItems] = useState<CategoryDTO[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategoryId = searchParams.get("categoryId");
    const searchQuery = searchParams.get("search") || "";
    const [searchInput, setSearchInput] = useState(searchQuery);

    useEffect(() => {
        if (categories) {
            setVisibleItems(categories.slice(0, 5));
            setHiddenItems(categories.slice(5))
        }
    }, [categories])

    const handleCategoryClick = (categoryId?: string) => {
        const newParams: Record<string, string> = {};

        if (categoryId) {
            newParams.categoryId = categoryId;
        }

        // Mantém a busca se existir
        if (searchQuery) {
            newParams.search = searchQuery;
        }

        setSearchParams(newParams);
    };

    const handleSearchChange = (value: string) => {
        setSearchInput(value);

        const newParams: Record<string, string> = {};

        if (value.trim()) {
            newParams.search = value.trim();
        }

        // Mantém a categoria se existir
        if (selectedCategoryId) {
            newParams.categoryId = selectedCategoryId;
        }

        setSearchParams(newParams);
    };

    const clearSearch = () => {
        setSearchInput("");
        const newParams: Record<string, string> = {};

        if (selectedCategoryId) {
            newParams.categoryId = selectedCategoryId;
        }

        setSearchParams(newParams);
    };

    const isActive = (categoryId?: string) => {
        if (!categoryId && !selectedCategoryId) return true;
        return categoryId === selectedCategoryId;
    };

    return (
        <nav className="w-full bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header Principal */}
                <div className="flex items-center justify-between py-4">
                    {/* Logo e Nome */}
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-bold text-2xl text-gray-900">Lojão W&M</h1>
                            <p className="text-xs text-gray-500 flex items-center gap-2">
                                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Novos produtos todos os dias
                            </p>
                        </div>
                    </div>

                    {/* Busca */}
                    <div className="flex-1 max-w-2xl mx-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Buscar produtos..."
                                value={searchInput}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="pl-11 pr-10 h-11 rounded-full border-2"
                            />
                            {searchInput && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={clearSearch}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full hover:bg-gray-100"
                                    title="Limpar busca"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Ações do usuário */}
                    <div className="flex items-center gap-3">
                        <UserMenu />
                        <CartButton />
                    </div>
                </div>

                {/* Categorias */}
                <div className="flex items-center gap-2 py-4 border-t overflow-x-auto">
                    <Button
                        variant="ghost"
                        onClick={() => handleCategoryClick()}
                        className={`rounded-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-md whitespace-nowrap ${isActive()
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
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
                            className={`rounded-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-md whitespace-nowrap ${isActive(category.id)
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
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
                                    className="rounded-full px-6 gap-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-md border-2 whitespace-nowrap"
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
                                        className={`rounded-xl px-4 py-3 cursor-pointer transition-all ${isActive(category.id)
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
                </div>
            </div>
        </nav>
    )
}