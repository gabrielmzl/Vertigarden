import { useEffect, useState } from "react";
import { DeviceModal } from "../components/DeviceModal";
import { useDevice } from "../context/DeviceContext";
import api from "../services/api";
import useFormate from "../hooks/useFormate";

export function Devices() {

  const { setOpen, userDevices, setUserDevices } = useDevice();
  const { formatCpfCnpj } = useFormate();

  useEffect(() => {
    async function getDevices() {
      const response = await api.get('/device/all');

      setUserDevices(response.data);
    }

    getDevices();
  }, [])

  const onOpenModal = () => setOpen(true);

  return (
    <>
      <div className="w-full flex flex-col">
        <h2 className="text-xl">Devices</h2>

        <div>
          <button className="bg-green-dark mt-2 py-4 px-6 text-white rounded-md text-sm font-normal" onClick={onOpenModal}>
            Cadastrar devices
          </button>
        </div>

        <div className="flex justify-between mt-4 items-center mb-8">
          <h1>Todos os devices</h1>

          <input type="text" placeholder="Pesquise por device aqui..." className="p-4 rounded-md w-96 outline-none shadow-lg" />
        </div>
        <div>
          <table className="border border-[#9C9C9C] rounded">
            <thead>
              <tr className="bg-[#ECEFEB] border-b border-[#9C9C9C]">
                <th>ID</th>
                <th>Cliente</th>
                <th>Dispositivo</th>
              </tr>
            </thead>
            <tbody>
              {userDevices.payload &&
                userDevices.payload
                  .slice()
                  .sort((a, b) => b.deviceID - a.deviceID)
                  .map((device, index) => (
                    <tr
                      className={`bg-white border-b border-[#9C9C9C] ${index === 0 ? 'first-notification' : ''
                        }`}
                      key={device.id}
                    >
                      <td>{device.deviceID}</td>
                      <td>{device.customerName} {formatCpfCnpj(device.customerDoc)}</td>
                      <td>{device.deviceToken}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeviceModal />
    </>
  )
}