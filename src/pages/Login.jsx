import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

export function Login() {

    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    });

    const submitLogin = async (data) => {
        await login(data.usuario, data.senha);
    }

    return (
        <div className="flex min-h-screen">
            <div className="flex flex-1 bg-hero bg-no-repeat bg-cover">
            </div>
            <div className="flex flex-col items-center justify-center flex-2 md:px-48 px-8">
                <div className="mb-8">
                    <img src="/logo_colorida.png" alt="Logo colorida" />
                </div>

                <form onSubmit={handleSubmit(submitLogin)} className='w-full'>
                    <div className="w-full flex flex-col gap-8">
                        <div className="flex flex-col w-full">
                            <label className="text-green-text text-lg mb-2">Login</label>
                            <input className="bg-input shadow-2xl p-4 rounded-md focus:outline-none" type="text" placeholder="Digite o seu login aqui..." {...register('usuario', { required: 'O usuario é obrigatorio.' })} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-green-text text-lg mb-2">Senha</label>
                            <input className="bg-input shadow-2xl p-4 rounded-md focus:outline-none" type="password" placeholder="Digite a sua senha aqui..."  {...register('senha', { required: 'A senha é obrigatoria.' })} />
                        </div>
                    </div>

                    <button className="bg-green-dark hover:bg-green-hover transition-all text-white p-4 text-center w-full font-normal rounded-md mt-16">Entrar</button>
                </form>

            </div>
        </div>
    )
}