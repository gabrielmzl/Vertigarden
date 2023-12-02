import { AlignJustify, ChevronFirst, Home, MonitorSmartphone, MoreVertical, Shield, UserCog2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useCliente } from "../context/ClienteContext";
import Modal from "react-responsive-modal";
import { useForm } from "react-hook-form"
import api from "../services/api";
import useAlert from "../hooks/useAlert";

export function Sidebar() {

  const { adminOpen, setAdminOpen } = useCliente();
  const { alertaSucesso } = useAlert();

  const onOpenModal = () => setAdminOpen(true);
  const onCloseModal = () => setAdminOpen(false);

  const onSubmitUsuario = async (data) => {
    try {
      const response = await api.post('/auth/register', {
        login: data.login,
        password: data.password,
        email: data.email,
        isAdmin: true,
        notify: true
      });

      alertaSucesso(response.data.payload);
      onCloseModal();
      reset();
    } catch (error) {
      console.log(error);
      alertaSucesso(error.response.data.payload);

      if (error.response.data.unauthenticated || error.response.data.unauthorized) {
        localStorage.removeItem('@token');
        window.location.reload();
        alertaErro('Sessão expirada, faça login novamente!');
      }
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm()

  return (
    <>
      <aside className="m-0 p-0 w-72 bg-green-dark fixed h-full overflow-auto text-white">
        <div className="flex justify-center items-center py-8 border-b-2 border-green-hr">
          <img src="./logo.png" alt="Logo Branca" />
        </div>
        <div className="p-4">
          <NavLink to="/" className={({ isActive }) => isActive ? "bg-green-light p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer" : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-light"}>
            <Home />
            <span className="text-[15px] ml-4 text-gray-200">Home</span>
          </NavLink>
          <NavLink to="/devices" className={({ isActive }) => isActive ? "bg-green-light p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer" : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-light"}>
            <MonitorSmartphone />
            <span className="text-[15px] ml-4 text-gray-200">Devices</span>
          </NavLink>
          <NavLink to="/clientes" className={({ isActive }) => isActive ? "bg-green-light p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer" : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-light"}>
            <UserCog2 />
            <span className="text-[15px] ml-4 text-gray-200">Clientes</span>
          </NavLink>

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-light" onClick={() => onOpenModal()}>
            <Shield />
            <span className="text-[15px] ml-4 text-gray-200">Admin</span>
          </div>
        </div>
      </aside>

      <Modal open={adminOpen} onClose={onCloseModal}>
        <form onSubmit={handleSubmit(onSubmitUsuario)}>
          <div className="bg-white px-4 pb-4 pt-5">
            <div>
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Cadastrar um novo usuario
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Login
                  </p>
                  <input type="text" placeholder='Digite o login aqui...'
                    {...register("login", { required: 'Login é obrigatorio.' })}
                    className='shadow-xl p-4 mt-2 border border-gray-200 rounded outline-none w-96' />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Email
                  </p>
                  <input type="email" placeholder='Digite o e-mail aqui...'
                    {...register("email", { required: 'E-mail é obrigatorio.' })}
                    className='shadow-xl p-4 mt-2 border border-gray-200 rounded outline-none w-96' />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Senha
                  </p>
                  <input type="password" placeholder='Digite a senha aqui...'
                    {...register("password", { required: 'E-mail é obrigatorio.' })}
                    className='shadow-xl p-4 mt-2 border border-gray-200 rounded outline-none w-96' />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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