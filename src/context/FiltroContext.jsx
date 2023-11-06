import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import useAlert from '../hooks/useAlert';

const FiltroContext = createContext();

export function useFiltro() {
    return useContext(FiltroContext);
}

export function FiltroProvider({ children }) {
    const { alertaErro } = useAlert();

    const [notifications, setNotifications] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchNotifications = async (filtro) => {
        try {
            let start, end;

            if (filtro) {
                start = 1;
                end = 20;
            } else {
                start = (page - 1) * 20 + 1;
                end = start + 19;
            }

            let queryParams = `?PagingStart=${start}&PagingEnd=${end}`;

            if (filtro) {
                if (filtro.device) {
                    queryParams += `&Device=${filtro.device}`;
                }
                if (filtro.customer) {
                    queryParams += `&Customer=${filtro.customer}`;
                }
                if (filtro.data) {
                    queryParams += `&DateStart=${filtro.data}`;
                }
                if (filtro.data2) {
                    queryParams += `&DateEnd=${filtro.data2}`;
                }
            }

            const { data } = await api.get(`/wlc${queryParams}`);

            if (data.payload.length === 0) {
                setHasMore(false);
            } else {
                if (!filtro) {
                    setNotifications([...notifications, ...data.payload]);
                    setPage(page + 1);
                    setHasMore(false);
                } else {
                    setNotifications(data.payload);
                    setPage(2);
                }
            }
        } catch (error) {
            alertaErro('Erro ao carregar notificações');
            setHasMore(false);
        }
    };

    const resetFiltro = async () => {
        try {
            const { data } = await api.get(`/wlc?PagingStart=1&PagingEnd=20`);

            setNotifications([...notifications, ...data.payload]);
        } catch (error) {
            alertaErro('Erro ao carregar notificações');
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <FiltroContext.Provider value={{ notifications, fetchNotifications, hasMore, resetFiltro }}>
            {children}
        </FiltroContext.Provider>
    );
}