import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/cases/cart/hooks/use-cart";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormattedNumber, IntlProvider } from "react-intl";
import { ArrowLeft, Package, AlertCircle, CheckCircle2 } from "lucide-react";

export function CheckoutPage() {
    const navigate = useNavigate();
    const { items, getTotalPrice, clearCart } = useCart();
    const { customer } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const shipping = 0; // Frete grátis
    const total = getTotalPrice();
    const totalWithShipping = total + shipping;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Criar Order com Items
            const orderPayload = {
                customer: { id: customer?.id },
                shipping,
                status: "NEW",
                total: totalWithShipping,
                items: items.map((item) => ({
                    product: { id: item.product.id },
                    quantity: item.quantity,
                    value: typeof item.product.price === 'string'
                        ? parseFloat(item.product.price)
                        : item.product.price,
                })),
            };

            const orderResponse = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload),
            });

            if (!orderResponse.ok) {
                throw new Error("Erro ao criar pedido");
            }

            // Sucesso!
            setSuccess(true);
            clearCart();

            setTimeout(() => {
                navigate("/");
            }, 3000);

        } catch (err: any) {
            setError(err.message || "Erro ao finalizar pedido");
            setLoading(false);
        }
    };

    if (items.length === 0 && !success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full">
                    <CardContent className="p-8 text-center space-y-4">
                        <Package className="w-16 h-16 text-gray-300 mx-auto" />
                        <h2 className="text-2xl font-bold text-gray-900">Carrinho vazio</h2>
                        <p className="text-gray-500">Adicione produtos ao carrinho antes de finalizar</p>
                        <Button onClick={() => navigate("/")} className="w-full">
                            Ir para loja
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full">
                    <CardContent className="p-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Pedido realizado!</h2>
                        <p className="text-gray-500">Seu pedido foi confirmado com sucesso</p>
                        <p className="text-sm text-gray-400">Redirecionando...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/")}
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                </Button>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizar Pedido</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Card de Confirmação */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-6">Confirmar Pedido</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5" />
                                        <span className="text-sm">{error}</span>
                                    </div>
                                )}

                                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
                                    <p className="text-sm font-medium">Cliente: {customer?.name}</p>
                                    <p className="text-xs text-blue-600 mt-1">@{customer?.username}</p>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                    disabled={loading}
                                >
                                    {loading ? "Processando..." : "Confirmar Pedido"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Resumo */}
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>

                                <div className="space-y-3 mb-4">
                                    {items.map((item) => (
                                        <div key={item.product.id} className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                {item.product.name} x{item.quantity}
                                            </span>
                                            <span className="font-medium">
                                                <IntlProvider locale="pt-BR">
                                                    <FormattedNumber
                                                        value={item.subtotal}
                                                        style="currency"
                                                        currency="BRL"
                                                    />
                                                </IntlProvider>
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span>
                                            <IntlProvider locale="pt-BR">
                                                <FormattedNumber
                                                    value={total}
                                                    style="currency"
                                                    currency="BRL"
                                                />
                                            </IntlProvider>
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Frete</span>
                                        <span className="text-green-600 font-medium">Grátis</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                        <span>Total</span>
                                        <span className="text-green-600">
                                            <IntlProvider locale="pt-BR">
                                                <FormattedNumber
                                                    value={totalWithShipping * 0.9}
                                                    style="currency"
                                                    currency="BRL"
                                                />
                                            </IntlProvider>
                                        </span>
                                    </div>
                                    <p className="text-xs text-center text-gray-500 pt-2">
                                        💰 Preço com 10% de desconto no PIX
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}