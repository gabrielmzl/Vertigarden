import { Fragment, useEffect, useState } from 'react'
import { useDevice } from '../context/DeviceContext'
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useForm } from "react-hook-form"
import api from '../services/api';
import { v4 } from 'uuid';
import Select from 'react-select';
import useFormate from '../hooks/useFormate';

export function DeviceModal() {
  const { open, setOpen, handleCreateDevice } = useDevice();
  const [clients, setClients] = useState();
  const { formatCpfCnpj } = useFormate();
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    async function getClients() {
      try {
        const { data } = await api.get('/customer/all');
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    }

    getClients();
  }, []);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  const onSubmitDevice = (data) => {
    handleCreateDevice(data);
    onCloseModal();
    reset();
  }

  const generateToken = () => {
    const token = v4();
    setValue("deviceToken", token, { shouldValidate: true });
  }

  const options = clients?.payload?.map(client => ({
    value: client.id,
    label: `${client.name} (${formatCpfCnpj(client.document)})`
  }));

  return (
    <Modal open={open} onClose={onCloseModal}>
      <form onSubmit={handleSubmit(onSubmitDevice)}>
        <div className="bg-white px-4 pb-4 pt-5">
          <div>
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Cadastrar um novo device
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Cliente
                </p>
                {options && (
                  <Select
                    onChange={(selectedOption) => setValue('client', selectedOption, { shouldValidate: true })}
                    options={options}
                    isSearchable={true}
                    placeholder="Selecione uma opção..."
                  />
                )}
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Device Token
                </p>
                <input
                  type="text"
                  placeholder='Digite o token do device aqui'
                  {...register("deviceToken", { required: true })}
                  className='p-4 mt-2 border border-gray-200 rounded outline-none w-96'
                />
                <p className="text-sm text-gray-500 hover:cursor-pointer font-medium" onClick={generateToken}>gerar token aleatorio</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded bg-green-dark px-3 py-4 text-sm font-normal text-white shadow-sm"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </Modal>
  )
}
