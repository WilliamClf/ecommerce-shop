import { Navigate } from "react-router-dom";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import type { ReactNode } from "react";

interface PrivateRouteProps {
    children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    const { customer, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500">Verificando autenticação...</p>
                </div>
            </div>
        );
    }

    if (!customer) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}