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
import { ChevronDown, Sparkles } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export function CategoryMenu() {
    const { data: categories, isLoading } = useCategories();
    const [visibleItems, setVisibleItems] = useState<CategoryDTO[]>([]);
    const [hiddenItems, setHiddenItems] = useState<CategoryDTO[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        if (categories) {
            setVisibleItems(categories.slice(0, 5));
            setHiddenItems(categories.slice(5))
        }
    }, [categories])

    const handleCategoryClick = (categoryId?: string) => {
        if (categoryId) {
            setSearchParams({ categoryId });
        } else {
            setSearchParams({});
        }
    };

    const isActive = (categoryId?: string) => {
        if (!categoryId && !selectedCategoryId) return true;
        return categoryId === selectedCategoryId;
    };

    return (
        <nav className="w-full py-8 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                    <div className="flex items-start gap-3">
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
                    <div className="flex items-center flex-wrap gap-2">
                        <Button
                            variant="ghost"
                            onClick={() => handleCategoryClick()}
                            className={`rounded-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-md ${isActive()
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
                                className={`rounded-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-md ${isActive(category.id)
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
                                        className="rounded-full px-6 gap-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-md border-2"
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

                {/* Decorative Line */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            </div>
        </nav>
    )
}