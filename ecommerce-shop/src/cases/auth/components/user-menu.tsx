import { useAuth } from "@/cases/auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, LogIn, UserPlus } from "lucide-react";

export function UserMenu() {
    const { customer, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate("/");
    };

    if (!customer) {
        return (
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/login")}
                    className="h-10"
                >
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                </Button>
                <Button
                    onClick={() => navigate("/register")}
                    className="h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Cadastrar
                </Button>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden md:inline">{customer.username}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-2">
                    <p className="text-sm font-medium">{customer.name}</p>
                    <p className="text-xs text-gray-500">@{customer.username}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}