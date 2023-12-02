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
    const [adminOpen, setAdminOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [clients, setClients] = useState([]);

    const { alertaErro, alertaSucesso } = useAlert();

    async function handleCreateClient(data) {
        try {
            data.doc = data.doc.replace(/\D/g, '');

            let docType = Number(data.docType)

            const response = await api.post('/customer', {
                name: data.name,
                docType: docType,
                doc: data.doc
            });

            getClients(response.data.payload);
            alertaSucesso(response.data.payload);
        } catch (error) {

            alertaErro('Erro ao cadastrar device!');
        }
    }

    async function getClients() {
        try {
            const { data } = await api.get('/customer/all');

            setClients(data);
        } catch (error) {
            if (error.response.data.unauthenticated || error.response.data.unauthorized) {
                localStorage.removeItem('@token');
                window.location.reload();
                alertaErro('Sessão expirada, faça login novamente!');
            }
        }
    }

    async function handleCreateClientJson(data) {
        try {


            const jsonData = JSON.parse(data.json);

            const response = await api.post('/customer', jsonData);

            getClients(response.data.payload);
            alertaSucesso(response.data.payload);
        } catch (error) {

            alertaErro('Erro ao cadastrar device!');
        }
    }

    return (
        <ClienteContext.Provider value={{ open, setOpen, adminOpen, setAdminOpen, open2, setOpen2, clients, setClients, handleCreateClient, handleCreateClientJson }}>
            {children}
        </ClienteContext.Provider>
    );
}