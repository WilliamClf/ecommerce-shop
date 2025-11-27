import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface Customer {
    id: string;
    name: string;
    username: string;
    address: string;
    zipcode: string;
    city: any;
}

interface AuthContextType {
    customer: Customer | null;
    loading: boolean;
    signUp: (data: {
        name: string;
        username: string;
        password: string;
        address: string;
        zipcode: string;
    }) => Promise<{ error: string | null }>;
    signIn: (username: string, password: string) => Promise<{ error: string | null }>;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(true);

    // Verificar se tem token salvo ao iniciar
    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        const savedCustomer = localStorage.getItem('customer');

        if (token && savedCustomer) {
            setCustomer(JSON.parse(savedCustomer));
        }

        setLoading(false);
    }, []);

    const signUp = async (data: {
        name: string;
        username: string;
        password: string;
        address: string;
        zipcode: string;
    }) => {
        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                return { error: error.message || 'Erro ao criar conta' };
            }

            const result = await response.json();

            // Salvar no localStorage (já loga automaticamente)
            localStorage.setItem('auth-token', result.token);
            localStorage.setItem('customer', JSON.stringify(result.customer));

            setCustomer(result.customer);

            return { error: null };
        } catch (error) {
            return { error: 'Erro ao criar conta' };
        }
    };

    const signIn = async (username: string, password: string) => {
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                return { error: 'Usuário ou senha incorretos' };
            }

            const data = await response.json();

            // Salvar no localStorage
            localStorage.setItem('auth-token', data.token);
            localStorage.setItem('customer', JSON.stringify(data.customer));

            setCustomer(data.customer);

            return { error: null };
        } catch (error) {
            return { error: 'Erro ao fazer login' };
        }
    };

    const signOut = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('customer');
        setCustomer(null);
    };

    return (
        <AuthContext.Provider
            value={{
                customer,
                loading,
                signUp,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}