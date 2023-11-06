import { useState } from "react";
import { FiltroModal } from "../components/FiltroModal";
import { X } from "lucide-react";
import { Notificacoes } from "../components/Notificacoes";
import { useFiltro } from "../context/FiltroContext";
import useFormate from "../hooks/useFormate";
import { Loader } from "../components/Loader";

export function Home() {
   const { resetFiltro, notifications } = useFiltro();
   const { formatCpfCnpj, formatDate } = useFormate();

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [ultimaNotificacao, setUltimaNotificacao] = useState(true);

   const openModal = () => {
      setIsModalOpen(true);
   };

   const closeModal = () => {
      setIsModalOpen(false);
   };

   const closeUltimaNotificacao = () => {
      setUltimaNotificacao(false);
   };

   const reset = () => {
      console.log('reset');
      resetFiltro();
   };

   if (notifications.length === 0) {
      return (
         <Loader />
      )
   }

   return (
      <div className="w-full flex flex-col">
         <div>
            <h2 className="text-xl">Ultimas notificações</h2>

            {ultimaNotificacao && (
               <div className="mt-4 rounded shadow-lg p-4 bg-white border border-green-dark w-2/4">
                  <div className="flex justify-between items-center">
                     <h3>Ultima notificação</h3>

                     <X className="hover:cursor-pointer" onClick={closeUltimaNotificacao} />
                  </div>

                  <div className="flex flex-col mt-4">
                     <div>
                        <b>Cliente:</b> {notifications[0].customerName} ({formatCpfCnpj(notifications[0].customerDoc)})
                     </div>
                     <div>
                        <b>Dispositivo:</b> {notifications[0].deviceToken}
                     </div>
                     <div>
                        <b>Data:</b> {formatDate(notifications[0].capturedAt)}
                     </div>
                  </div>
               </div>
            )}

            <button onClick={openModal} className="bg-green-light mt-8 py-2 px-6 text-white rounded-md text-sm font-normal">Filtros</button>
            <button onClick={reset} className="ml-4">Resetar filtros</button>
            
            <Notificacoes />
         </div>

         <FiltroModal isOpen={isModalOpen} onClose={closeModal} />
      </div >
   )
}