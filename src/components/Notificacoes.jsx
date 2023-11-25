import useFormate from "../hooks/useFormate";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "./Loader";
import { useFiltro } from "../context/FiltroContext";
import { useEffect } from "react";

export function Notificacoes() {

    const { notifications, setHasMore, fetchNotifications, hasMore, notificationsFiltro, filtros, hasMoreFiltro } = useFiltro();
    const { formatDate, formatCpfCnpj } = useFormate();

    if (notifications.length == 0 || notifications.length <= 8) {
        setHasMore(false)
    }

    return (
        <div className="mt-6">
            {notificationsFiltro.length == 0 ? (
                <InfiniteScroll className="w-full"
                    dataLength={notifications.length}
                    next={fetchNotifications}
                    hasMore={hasMore}
                    loader={<Loader />}
                >
                    <table className="border border-[#9C9C9C] rounded">
                        <thead>
                            <tr className="bg-[#ECEFEB] border-b border-[#9C9C9C]">
                                <th>Cliente</th>
                                <th>Dispositivo</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notifications.map((notification, index) => (
                                <tr className={`bg-white border-b border-[#9C9C9C] ${index === 0 ? 'first-notification' : ''}`} key={notification.id}>
                                    <td>{notification.customerName} ({formatCpfCnpj(notification.customerDoc)})</td>
                                    <td>{notification.deviceToken}</td>
                                    <td>{formatDate(notification.capturedAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </InfiniteScroll>
            ) : (
                <InfiniteScroll className="w-full"
                    dataLength={notificationsFiltro.length}
                    next={filtros}
                    hasMore={hasMoreFiltro}
                    loader={<Loader />}
                >
                    <table className="border border-[#9C9C9C] rounded">
                        <thead>
                            <tr className="bg-[#ECEFEB] border-b border-[#9C9C9C]">
                                <th>Cliente</th>
                                <th>Dispositivo</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notificationsFiltro.map((notificationFiltro, index) => (
                                <tr className={`bg-white border-b border-[#9C9C9C] ${index === 0 ? 'first-notification' : ''}`} key={notificationFiltro.id}>
                                    <td>{notificationFiltro.customerName} ({notificationFiltro.customerDoc})</td>
                                    <td>{notificationFiltro.deviceToken}</td>
                                    <td>{formatDate(notificationFiltro.capturedAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </InfiniteScroll>
            )}
        </div>
    )
}