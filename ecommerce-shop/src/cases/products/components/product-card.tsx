import { Card, CardContent } from "@/components/ui/card";
import type { ProductDTO } from "../dtos/product.dto";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Package, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
    product: ProductDTO;
}

export function ProductCard({ product }: ProductCardProps) {
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Previne navegação do Link
        console.log('Produto adicionado ao carrinho:', product.name);
        // TODO: Implementar lógica do carrinho
    };

    return (
        <Card className="w-[280px] hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <CardContent className="p-0">
                {/* Imagem do Produto */}
                <div className="w-full h-[280px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-t-lg overflow-hidden">
                    {product.imageUrl ? (
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                // Fallback se a imagem não carregar
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full"><svg class="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg></div>';
                            }}
                        />
                    ) : (
                        <Package className="w-20 h-20 text-gray-400" />
                    )}
                </div>

                {/* Conteúdo */}
                <div className="p-4 space-y-3">
                    {/* Nome do Produto */}
                    <h4 className="font-semibold text-gray-900 text-lg line-clamp-2 min-h-[56px]">
                        {product.name}
                    </h4>

                    {/* Preços */}
                    <div className="space-y-2">
                        {/* Preço à Vista (riscado) */}
                        <div className="text-sm text-gray-400 line-through">
                            <IntlProvider locale="pt-BR">
                                <FormattedNumber
                                    value={product.price * 1.15}
                                    style="currency"
                                    currency="BRL"
                                />
                            </IntlProvider>
                        </div>

                        {/* Preço Parcelado */}
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

                        {/* Preço no PIX (destaque) */}
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

                    {/* Botão Adicionar ao Carrinho */}
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