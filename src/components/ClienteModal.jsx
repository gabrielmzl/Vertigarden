import { Fragment, useEffect, useRef, useState } from 'react'

import { useDevice } from '../context/DeviceContext'
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useForm } from "react-hook-form"
import api from '../services/api';
import axios from 'axios';
import useAlert from '../hooks/useAlert';
import { useCliente } from '../context/ClienteContext';

export function ClienteModal() {
  const { open, setOpen, open2, setOpen2, handleCreateClient, handleCreateClientJson } = useCliente();

  const onsubmitdevice = (data) => {
    handleCreateClient(data);
    onCloseModal();
    reset();
  }

  const onsubmitjson = (data) => {
    handleCreateClientJson(data);
    onCloseModal2();
    reset2();
  }

  const onCloseModal = () => setOpen(false);
  const onCloseModal2 = () => setOpen2(false);

  const onOpenModal2 = () => setOpen2(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm()

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    setValue: setValue2,
    reset: reset2
  } = useForm({
    mode: "onBlur",
  });

  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <form onSubmit={handleSubmit(onsubmitdevice)}>
          <div className="bg-white px-4 pb-4 pt-5">
            <div>
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Cadastrar um novo cliente
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Nome
                  </p>
                  <input type="text" placeholder='Digite o nome aqui...'
                    {...register("name", { required: true })}
                    className='shadow-xl p-4 mt-2 border border-gray-200 rounded outline-none w-96' />
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Selecione o tipo de documento
                  </p>
                  <select {...register("docType")} name="clients" id="clients" className='shadow-xl p-4 mt-2 border border-gray-200 rounded outline-none w-full' onChange={(e) => {
                    setValue("docType", e.target.value, { shouldValidate: true });
                  }}>
                    <option value={0}>CPF</option>
                    <option value={1}>CNPJ</option>
                  </select>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Documento
                  </p>
                  <input type="text" placeholder='Digite o documento aqui...'
                    {...register("doc", { required: true })}
                    className='shadow-xl p-4 mt-2 border border-gray-200 rounded outline-none w-96' />
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

          <p className="text-sm text-gray-500 text-center hover:cursor-pointer" onClick={onOpenModal2}>
            clique aqui para importar clientes via JSON
          </p>
        </form>
      </Modal>

      <Modal open={open2} onClose={onCloseModal2}>
        <form onSubmit={handleSubmit2(onsubmitjson)}>
          <div className="bg-white px-4 pb-4 pt-5">
            <div>
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Cadastrar cliente via JSON
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    JSON
                  </p>
                  <textarea type="text" placeholder='Digite o nome aqui...'
                    {...register2("json", { required: true })}
                    className='shadow-xl p-4 mt-2 border border-gray-200 rounded outline-none w-96' />
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
    </>
  )
}
