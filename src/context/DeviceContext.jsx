import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import useAlert from '../hooks/useAlert';

const DeviceContext = createContext();

export function useDevice() {
    return useContext(DeviceContext);
}

export function DeviceProvider({ children }) {


    const [open, setOpen] = useState(false);
    const [userDevices, setUserDevices] = useState([]);

    const { alertaErro, alertaSucesso } = useAlert();

    async function handleCreateDevice(data) {

        try {
            if (!data.client) {
                const response = await api.post('/device', {
                    token: data.deviceToken,
                });
            } else {
                const response = await api.post('/device', {
                    token: data.deviceToken,
                    ownerId: data.client.value
                });
            }

            alertaSucesso('Device criado com sucesso.');
            getDevices();

        } catch (error) {

            alertaErro('Erro ao cadastrar device!');
        }
    }

    async function getDevices() {
        try {
            const response = await api.get('/device/all');

            setUserDevices(response.data);
        } catch (error) {
            if (error.response.data.unauthenticated || error.response.data.unauthorized) {
                localStorage.removeItem('@token');
                window.location.reload();
                alertaErro('Sessão expirada, faça login novamente!');
            }
        }
    }

    return (
        <DeviceContext.Provider value={{ open, setOpen, handleCreateDevice, userDevices, setUserDevices, getDevices }}>
            {children}
        </DeviceContext.Provider>
    );
}