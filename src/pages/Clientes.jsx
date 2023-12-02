import { useEffect } from "react";
import { ClienteModal } from "../components/ClienteModal";
import { useCliente } from "../context/ClienteContext";
import api from "../services/api";
import useFormate from "../hooks/useFormate";
import useAlert from "../hooks/useAlert";

export function Clientes() {

  const { setOpen, setClients, clients } = useCliente()
  const { formatCpfCnpj } = useFormate();
  const { alertaErro } = useAlert()

  const onOpenModal = () => setOpen(true);

  useEffect(() => {
    async function getClients() {
      try {
        const response = await api.get('/customer/all');

        setClients(response.data);
      } catch (error) {
        if (error.response.data.unauthenticated || error.response.data.unauthorized) {
          localStorage.removeItem('@token');
          window.location.reload();
          alertaErro('Sessão expirada, faça login novamente!');
        }
      }
    }

    getClients();
  }, [])

  return (
    <>
      <div className="w-full flex flex-col">
        <h2 className="text-xl">Clientes</h2>

        <div>
          <button className="bg-green-dark mt-2 py-4 px-6 text-white rounded-md text-sm font-normal" onClick={onOpenModal}>
            Cadastrar cliente
          </button>
        </div>

        <div className="flex justify-between mt-4 items-center mb-8">
          <h1>Todos os clientes</h1>

          <input type="text" placeholder="Pesquise por clientes aqui..." className="p-4 rounded-md w-96 outline-none shadow-lg" />
        </div>
        <div>
          <table className="border border-[#9C9C9C] rounded">
            <thead>
              <tr className="bg-[#ECEFEB] border-b border-[#9C9C9C]">
                <th>ID</th>
                <th>Cliente</th>
                <th>Documento</th>
              </tr>
            </thead>
            <tbody>
              {clients.payload &&
                clients.payload
                  .slice()
                  .sort((a, b) => b.id - a.id)
                  .map((client, index) => (
                    <tr
                      className={`bg-white border-b border-[#9C9C9C] ${index === 0 ? 'first-notification' : ''
                        }`}
                      key={client.id}
                    >
                      <td>{client.id}</td>
                      <td>{client.name}</td>
                      <td>{formatCpfCnpj(client.document)}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      <ClienteModal />
    </>
  );
}