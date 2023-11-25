import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import useAlert from '../hooks/useAlert';
import axios from 'axios';

const ClienteContext = createContext();

export function useCliente() {
    return useContext(ClienteContext);
}

export function ClienteProvider({ children }) {

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [clients, setClients] = useState([]);

    const { alertaErro, alertaSucesso } = useAlert();

    async function handleCreateClient(data) {
        try {
            console.log(data);

            let docType = Number(data.docType)

            const response = await api.post('/customer', {
                name: data.name,
                docType: docType,
                doc: data.doc
            });

            getClients(response.data.payload);
            alertaSucesso(response.data.payload);
        } catch (error) {
            console.log(error);
            alertaErro('Erro ao cadastrar device!');
        }
    }

    async function getClients() {
        const { data } = await api.get('/customer/all');

        setClients(data);
    }

    async function handleCreateClientJson(data) {
        try {
            console.log(data);

            const jsonData = JSON.parse(data.json);

            const response = await api.post('/customer', jsonData);

            getClients(response.data.payload);
            alertaSucesso(response.data.payload);
        } catch (error) {
            console.log(error);
            alertaErro('Erro ao cadastrar device!');
        }
    }

    return (
        <ClienteContext.Provider value={{ open, setOpen, open2, setOpen2, clients, setClients, handleCreateClient, handleCreateClientJson }}>
            {children}
        </ClienteContext.Provider>
    );
}