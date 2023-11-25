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
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMoreFiltro, setHasMoreFiltro] = useState(true);
    const [pageFiltro, setPageFiltro] = useState(1);
    const [loadingFiltro, setLoadingFiltro] = useState(false);

    const [notificationsFiltro, setNotificationsFiltro] = useState([]);

    const fetchNotifications = async (start, end) => {
        try {
            setLoading(true);
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
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setNotifications([]);
            alertaErro("Erro ao carregar notificações");
            setHasMore(false);
        }
    };

    const filtros = async (data) => {
        if (data.data2 && data.data && data.data2 < data.data) {
            console.error('Data final deve ser posterior à data inicial.');
            return;
        }
        // Construção dos parâmetros de consulta
        const queryParams = new URLSearchParams();

        queryParams.append('PagingStart', '1');
        queryParams.append('PagingEnd', '20');

        if (data.device) queryParams.append('Device', data.device.label);
        if (data.customer) queryParams.append('Customer', data.customer.value);
        if (data.data) queryParams.append('DateStart', data.data);
        if (data.data2) queryParams.append('DateEnd', data.data2);

        try {
            setLoadingFiltro(true);
            setPageFiltro(1);

            const { data: filtroData } = await api.get(`/wlc?${queryParams.toString()}`);

            if (filtroData.payload.length === 0) {
                setHasMoreFiltro(false);
                alertaErro('Nenhuma notificação encontrada com esse filtro.');
            } else {
                setNotificationsFiltro([...filtroData.payload]);
                setPageFiltro(pageFiltro + 1);
                setHasMoreFiltro(filtroData.payload.length === 20);
            }

            setLoadingFiltro(false);
        } catch (error) {
            alertaErro('Erro ao carregar notificações.');
            setHasMoreFiltro(false);
            setLoadingFiltro(false);
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
        <FiltroContext.Provider value={{ reset, notifications, setHasMore, setPageFiltro, fetchNotifications, loading, hasMore, filtros, notificationsFiltro, hasMoreFiltro, loadingFiltro }}>
            {children}
        </FiltroContext.Provider>
    );
}