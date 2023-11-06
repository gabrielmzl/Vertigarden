import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import useAlert from '../hooks/useAlert';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const { alertaSucesso, alertaErro } = useAlert();

    let navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('@token');

        if (token) {
            setIsAuthenticated(true);
            setToken(token);
        }
    }, []);

    const login = async (login, password) => {
        try {
            const { data } = await api.post('/auth/login', {
                login,
                password
            })
            
            localStorage.setItem('@token', data.payload);
            setIsAuthenticated(true);
            setToken(data.payload);
            navigate('/');
            alertaSucesso('Login realizado com sucesso!');
        } catch (error) {
            alertaErro(error.response.data.errors[0]);
        }
    }

    return (
        <AuthContext.Provider value={{ login, token, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}