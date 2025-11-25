import { useParams, useNavigate } from "react-router-dom";
import { useProductById } from "@/cases/products/hooks/use-product";
import { Button } from "@/components/ui/button";
import { FormattedNumber, IntlProvider } from "react-intl";
import { ArrowLeft, Package, Tag, Building2, ShoppingCart, Truck, Shield, RefreshCw } from "lucide-react";
import { useCart } from "@/cases/cart/hooks/use-cart";
import { CartButton } from "@/components/ui/cart-button";

export function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: product, isLoading, error } = useProductById(id!);
    const { addToCart } = useCart();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500">Carregando produto...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="text-6xl">😕</div>
                <h2 className="text-2xl font-bold text-gray-700">Produto não encontrado</h2>
                <p className="text-gray-500">O produto que você procura não existe ou foi removido.</p>
                <Button onClick={() => navigate('/')} className="mt-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar para produtos
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header da Loja */}
            <div className="w-full py-6 px-4 bg-white border-b shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <h5 className="font-bold text-2xl text-gray-900">
                                Lojao W&M
                            </h5>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Novos produtos todos os dias
                            </p>
                        </div>
                    </div>

                    {/* Botão do Carrinho */}
                    <CartButton />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Botão Voltar */}
                <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="mb-4 hover:bg-white"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar para produtos
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Coluna Esquerda - Imagem */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                            {product.imageUrl ? (
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Package className="w-24 h-24 text-gray-300" />
                            )}
                        </div>
                    </div>

                    {/* Coluna Direita - Informações */}
                    <div className="space-y-6">
                        {/* Card Principal com Informações */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                            {/* Badges */}
                            <div className="flex gap-2 flex-wrap">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                    <Tag className="w-3 h-3" />
                                    {product.category.name}
                                </span>
                                {product.brand && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                                        <Building2 className="w-3 h-3" />
                                        {product.brand.name}
                                    </span>
                                )}
                            </div>

                            {/* Título */}
                            <h1 className="text-2xl font-bold text-gray-900">
                                {product.name}
                            </h1>

                            {/* Descrição */}
                            {product.description && (
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {product.description}
                                </p>
                            )}

                            {/* Divisor */}
                            <div className="border-t"></div>

                            {/* Preços */}
                            <div className="space-y-3">
                                {/* Preço Riscado */}
                                <div>
                                    <p className="text-xs text-gray-500">Preço à vista (cartão):</p>
                                    <p className="text-lg font-semibold text-gray-400 line-through">
                                        <IntlProvider locale="pt-BR">
                                            <FormattedNumber
                                                value={product.price * 1.15}
                                                style="currency"
                                                currency="BRL"
                                            />
                                        </IntlProvider>
                                    </p>
                                </div>

                                {/* Preço Parcelado */}
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <p className="text-xs text-blue-900 font-medium mb-1">Ou em até 10x sem juros:</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-blue-600">
                                            <IntlProvider locale="pt-BR">
                                                <FormattedNumber
                                                    value={product.price}
                                                    style="currency"
                                                    currency="BRL"
                                                />
                                            </IntlProvider>
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            10x de{" "}
                                            <IntlProvider locale="pt-BR">
                                                <FormattedNumber
                                                    value={product.price / 10}
                                                    style="currency"
                                                    currency="BRL"
                                                />
                                            </IntlProvider>
                                        </span>
                                    </div>
                                </div>

                                {/* PIX Destaque */}
                                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-white">
                                    <p className="text-xs font-medium mb-1">💰 Melhor oferta no PIX (10% OFF):</p>
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-3xl font-bold">
                                            <IntlProvider locale="pt-BR">
                                                <FormattedNumber
                                                    value={product.price * 0.9}
                                                    style="currency"
                                                    currency="BRL"
                                                />
                                            </IntlProvider>
                                        </span>
                                        <span className="text-xs opacity-90">
                                            Economize{" "}
                                            <IntlProvider locale="pt-BR">
                                                <FormattedNumber
                                                    value={product.price * 0.1}
                                                    style="currency"
                                                    currency="BRL"
                                                />
                                            </IntlProvider>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Botão Adicionar */}
                            <Button
                                onClick={() => addToCart(product)}
                                className="w-full h-12 text-base bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                            >
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Adicionar ao Carrinho
                            </Button>
                        </div>

                        {/* Card de Benefícios */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-4">Benefícios</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                        <Truck className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span>Frete grátis para todo o Brasil</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span>Garantia de 1 ano</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                                        <RefreshCw className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <span>Devolução grátis em 30 dias</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}