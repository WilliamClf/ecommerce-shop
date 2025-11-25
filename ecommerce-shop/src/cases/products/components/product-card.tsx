import { Card, CardContent } from "@/components/ui/card";
import type { ProductDTO } from "../dtos/product.dto";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Package, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/cases/cart/hooks/use-cart";

type ProductCardProps = {
    product: ProductDTO;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product);
    };

    return (
        <Card className="w-[280px] hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <CardContent className="p-0">
                <div className="w-full h-[280px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-t-lg overflow-hidden">
                    {product.imageUrl ? (
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Package className="w-20 h-20 text-gray-400" />
                    )}
                </div>

                <div className="p-4 space-y-3">

                    <h4 className="font-semibold text-gray-900 text-lg line-clamp-2">
                        {product.name}
                    </h4>

                    {product.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
                            {product.description}
                        </p>
                    )}

                    <div className="space-y-2">
                        <div className="text-sm text-gray-400 line-through">
                            <IntlProvider locale="pt-BR">
                                <FormattedNumber
                                    value={product.price * 1.15}
                                    style="currency"
                                    currency="BRL"
                                />
                            </IntlProvider>
                        </div>

                        <div className="text-gray-700">
                            <div className="text-xl font-bold">
                                <IntlProvider locale="pt-BR">
                                    <FormattedNumber
                                        value={product.price}
                                        style="currency"
                                        currency="BRL"
                                    />
                                </IntlProvider>
                            </div>
                            <div className="text-xs text-gray-500">
                                em 10x de{" "}
                                <IntlProvider locale="pt-BR">
                                    <FormattedNumber
                                        value={product.price / 10}
                                        style="currency"
                                        currency="BRL"
                                    />
                                </IntlProvider>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-lg">
                            <div className="text-xs font-medium">💰 No PIX</div>
                            <div className="text-lg font-bold">
                                <IntlProvider locale="pt-BR">
                                    <FormattedNumber
                                        value={product.price * 0.9}
                                        style="currency"
                                        currency="BRL"
                                    />
                                </IntlProvider>
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={handleAddToCart}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Adicionar ao Carrinho
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}