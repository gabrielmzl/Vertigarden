import useFormate from "../hooks/useFormate";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "./Loader";
import { useFiltro } from "../context/FiltroContext";

export function Notificacoes() {

    const { notifications, fetchNotifications, hasMore } = useFiltro();
    const { formatDate, formatCpfCnpj } = useFormate();

    return (
        <div className="mt-6">
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
                            <tr className={`bg-white border-b border-[#9C9C9C] ${index === 0 ? 'first-notification' : ''}`}  key={notification.id}>
                                <td>{notification.customerName} ({formatCpfCnpj(notification.customerDoc)})</td>
                                <td>{notification.deviceToken}</td>
                                <td>{formatDate(notification.capturedAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </InfiniteScroll>
        </div>
    )
}