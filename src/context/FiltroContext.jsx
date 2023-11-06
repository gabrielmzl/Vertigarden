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
    const [hasMoreFiltro, setHasMoreFiltro] = useState(true);
    const [pageFiltro, setPageFiltro] = useState(1);
    const [loadingFiltro, setLoading] = useState(false);

    const [notificationsFiltro, setNotificationsFiltro] = useState([]);

    const fetchNotifications = async (start, end) => {
        setTimeout(async () => {
            try {
                const start = (page - 1) * 20 + 1;
                const end = start + 19;

                const { data } = await api.get(`/wlc?PagingStart=${start}&PagingEnd=${end}`);

                console.log(data);
                if (data.payload.length === 0) {
                    setHasMore(false);
                } else {
                    setNotifications([...notifications, ...data.payload]);
                    setPage(page + 1);
                }
            } catch (error) {
                alertaErro("Erro ao carregar notificações");
                setHasMore(false);
            }
        }, 1500);
    };

    const filtros = async (filtro) => {
        try {
            setPageFiltro(1)
            const start = (pageFiltro - 1) * 20 + 1;
            const end = start + 19;

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
            setLoading(true);
            const { data } = await api.get(`/wlc${queryParams}`);

            if (data.payload.length === 0) {
                setHasMoreFiltro(false);
                setLoading(false);
                alertaErro('Nenhuma notificação foi encontrada com esse filtro.')
            } else {
                
                setNotificationsFiltro([...data.payload]);
                setPageFiltro(pageFiltro + 1);

                if (data.payload.length < 20) {
                    setHasMoreFiltro(false);
                }

                setLoading(false);
            }
        } catch (error) {
            alertaErro("Erro ao carregar notificações");
            setHasMoreFiltro(false);
            setLoading(false);
        }
    }

    const reset = () => {
        setPageFiltro(1)
        setNotificationsFiltro([])
    }

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <FiltroContext.Provider value={{ reset, notifications, setPageFiltro, fetchNotifications, hasMore, filtros, notificationsFiltro, hasMoreFiltro, loadingFiltro }}>
            {children}
        </FiltroContext.Provider>
    );
}