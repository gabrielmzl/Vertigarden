import { useEffect, useState } from "react";
import api from "../services/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "../components/Loader";
import useAlert from "../hooks/useAlert";
import useFormate from "../hooks/useFormate";

export function Home() {

    const { alertaErro } = useAlert();
    const { formatDate, formatCpfCnpj } = useFormate();

    const [notifications, setNotifications] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchNotifications = async (start, end) => {
        setTimeout(async () => {
            try {
                const start = (page - 1) * 20 + 1;
                const end = start + 19;
                const { data } = await api.get(`/wlc?PagingStart=${start}&PagingEnd=${end}`);
                console.log(data);
                if (data.length === 0) {
                    setHasMore(false);
                } else {
                    setNotifications([...notifications, ...data]);
                    setPage(page + 1);
                }
            } catch (error) {
                alertaErro("Erro ao carregar notificações");
                setHasMore(false);
            }
        }, 1500);
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className="w-full flex flex-col">
            <div>
                <h2 className="text-xl">Ultimas notificações</h2>

                <div className="mt-6">
                    <InfiniteScroll className="w-full"
                        dataLength={notifications.length}
                        next={fetchNotifications}
                        hasMore={hasMore}
                        loader={<Loader />}
                    >
                        <table className="border border-[#9C9C9C]">
                            <thead>
                                <tr className="bg-[#ECEFEB] border-b border-[#9C9C9C]">
                                    <th>Cliente</th>
                                    <th>Documento</th>
                                    <th>Dispositivo</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>

                                {notifications.map((notification) => (
                                    <tr className="bg-white border-b border-[#9C9C9C]" key={notification.id}>
                                        <td>{notification.customerName}</td>
                                        <td>{formatCpfCnpj(notification.customerDoc)}</td>
                                        <td>{notification.deviceToken}</td>
                                        <td>{formatDate(notification.capturedAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </InfiniteScroll>
                </div>
            </div>
            <div>
                <div>

                </div>
            </div>
        </div >
    )
}