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
            const response = await api.post('/device', {
                token: data.deviceToken,
                ownerId: data.client.value
            });

            alertaSucesso(response.data.payload);
            getDevices();

        } catch (error) {
            console.log(error);
            alertaErro('Erro ao cadastrar device!');
        }
    }

    async function getDevices() {
        const response = await api.get('/device/all');
        console.log(response.data);

        setUserDevices(response.data);
    }

    return (
        <DeviceContext.Provider value={{ open, setOpen, handleCreateDevice, userDevices, setUserDevices, getDevices }}>
            {children}
        </DeviceContext.Provider>
    );
}