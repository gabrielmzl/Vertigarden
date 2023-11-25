import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFiltro } from "../context/FiltroContext";
import useFormate from "../hooks/useFormate";
import Select from 'react-select';
import api from "../services/api";
export function FiltroModal({ isOpen, onClose, children }) {
   if (!isOpen) return null;

   const { filtros, loadingFiltro, setPageFiltro } = useFiltro();
   const { formatCpfCnpj } = useFormate();
   const [clients, setClients] = useState();
   const [devices, setDevices] = useState();

   const fetchData = async () => {
      try {
         const [clientsData, devicesData] = await Promise.all([
            api.get('/customer/all'),
            api.get('/device/all')
         ]);

         setClients(clientsData.data);
         setDevices(devicesData.data);
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm({
      mode: "onBlur",
   });

   const submitFiltro = async (data) => {
      await filtros(data);
      onClose();
   }

   const options = clients?.payload?.map(client => ({
      value: client.id,
      label: `${client.name} (${formatCpfCnpj(client.document)})`
   }));

   const options2 = devices?.payload?.map(device => ({
      value: device.deviceID,
      label: device.deviceToken
   }));

   return (
      <div className="fixed inset-0">
         <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
         />
         <div className="fixed right-0 top-0 h-screen bg-white w-96">
            <div className="flex justify-between p-6 items-center border-b border-gray-400">
               <div className="text-lg">
                  Filtros
               </div>

               <div className="hover:cursor-pointer">
                  <X onClick={onClose} />
               </div>
            </div>

            <form onSubmit={handleSubmit(submitFiltro)} className="flex flex-col p-6">
               <h3 className="mb-4">Filtrar por:</h3>

               <div className="flex flex-col">
                  <label>Customer</label>
                  {options && (
                     <Select
                        onChange={(selectedOption) => setValue('customer', selectedOption, { shouldValidate: true })}
                        options={options}
                        isSearchable={true}
                        placeholder="Selecione uma opção..."
                     />
                  )}
               </div>

               <div className="flex flex-col mt-3">
                  <label>Device</label>
                  {options && (
                     <Select
                        onChange={(selectedOption) => setValue('device', selectedOption, { shouldValidate: true })}
                        options={options2}
                        isSearchable={true}
                        placeholder="Selecione uma opção..."
                     />
                  )}
               </div>

               <div className="flex flex-col mt-4">
                  <label>Data</label>
                  <input {...register('data')} type="datetime-local" className="border p-3 rounded outline-none mt-1" />

                  <span className="mt-2 mb-1 text-center">até</span>

                  <input {...register('data2')} type="datetime-local" className="border p-3 rounded outline-none mt-1" />

               </div>

               <button className="bg-green-dark text-white rounded w-full p-4 mt-6 font-normal">
                  {loadingFiltro ? <span class="loader2"></span> : 'Aplicar filtros'}
               </button>
            </form>
         </div>
      </div>
   );
}