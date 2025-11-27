import { useCart } from "@/cases/cart/hooks/use-cart";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { FormattedNumber, IntlProvider } from "react-intl";

export function CartSidebar() {
    const { items, isOpen, closeCart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
    const { customer } = useAuth();
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
                onClick={closeCart}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                            <ShoppingBag className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Meu Carrinho</h2>
                            <p className="text-sm text-gray-500">
                                {items.length} {items.length === 1 ? 'item' : 'itens'}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={closeCart}
                        className="rounded-full hover:bg-white"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                                <ShoppingBag className="w-12 h-12 text-gray-300" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-semibold text-gray-900 mb-2">Carrinho vazio</h3>
                                <p className="text-gray-500 text-sm">
                                    Adicione produtos para começar suas compras
                                </p>
                            </div>
                            <Button onClick={closeCart} variant="outline" className="mt-4">
                                Continuar comprando
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    {/* Imagem */}
                                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 border">
                                        {item.product.imageUrl ? (
                                            <img
                                                src={item.product.imageUrl}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <ShoppingBag className="w-8 h-8 text-gray-300" />
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-3">
                                            {item.product.category.name}
                                        </p>

                                        {/* Controles de quantidade */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 bg-white rounded-lg border">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 hover:bg-gray-100"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product.id!,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </Button>
                                                <span className="text-sm font-medium w-8 text-center">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 hover:bg-gray-100"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product.id!,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </Button>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => removeFromCart(item.product.id!)}
                                                title="Remover item"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        {/* Preço */}
                                        <div className="mt-3 pt-3 border-t">
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs text-gray-500">
                                                    <IntlProvider locale="pt-BR">
                                                        <FormattedNumber
                                                            value={item.product.price}
                                                            style="currency"
                                                            currency="BRL"
                                                        />
                                                    </IntlProvider>
                                                    {" cada"}
                                                </p>
                                                <p className="text-sm font-bold text-gray-900">
                                                    <IntlProvider locale="pt-BR">
                                                        <FormattedNumber
                                                            value={item.subtotal}
                                                            style="currency"
                                                            currency="BRL"
                                                        />
                                                    </IntlProvider>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Botão limpar carrinho */}
                            {items.length > 0 && (
                                <Button
                                    variant="ghost"
                                    className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => {
                                        if (window.confirm("Deseja realmente limpar todo o carrinho?")) {
                                            clearCart();
                                        }
                                    }}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Limpar carrinho
                                </Button>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer - Total e Checkout */}
                {items.length > 0 && (
                    <div className="border-t bg-white p-6 space-y-4 shadow-lg">
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-semibold">
                                    <IntlProvider locale="pt-BR">
                                        <FormattedNumber
                                            value={getTotalPrice()}
                                            style="currency"
                                            currency="BRL"
                                        />
                                    </IntlProvider>
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-lg font-bold pt-3 border-t">
                                <span>Total no PIX</span>
                                <div className="text-right">
                                    <span className="text-green-600">
                                        <IntlProvider locale="pt-BR">
                                            <FormattedNumber
                                                value={getTotalPrice() * 0.9}
                                                style="currency"
                                                currency="BRL"
                                            />
                                        </IntlProvider>
                                    </span>
                                    <p className="text-xs text-gray-500 font-normal">
                                        Economia de{" "}
                                        <IntlProvider locale="pt-BR">
                                            <FormattedNumber
                                                value={getTotalPrice() * 0.1}
                                                style="currency"
                                                currency="BRL"
                                            />
                                        </IntlProvider>
                                    </p>
                                </div>
                            </div>
                            <p className="text-xs text-center text-gray-500 pt-2">
                                💰 10% de desconto no PIX aplicado
                            </p>
                        </div>

                        <Button
                            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                            onClick={() => {
                                if (!customer) {
                                    closeCart();
                                    navigate("/login");
                                } else {
                                    closeCart();
                                    navigate("/checkout");
                                }
                            }}
                        >
                            Finalizar Compra
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}