import { useEffect, useRef} from 'react';
import { useAuthUser, useIsAuthenticated, useSignIn } from 'react-auth-kit';
import {  useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'react-query'
import {Controller, useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { login } from '../services/authservice';

const schema = yup.object({
  username: yup.string()
  .required(),
 password: yup.string().required(),
}).required();


const Login = () => {

  const toast = useRef();
  const isAuth = useIsAuthenticated();
  const auth = useAuthUser()()
  const signIn = useSignIn();
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuth()) {
      const targetDashboard = '/dashboard';
      navigate(targetDashboard, { replace: true });
    }
    return;
  }, [isAuth,navigate,auth])

  const defaultValues = {username:'',password:''};
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
};


  const {mutate} = useMutation((data) => login(data), {
    onSuccess(data) { 
      toast.current.show({severity: 'success', summary: 'Bienvenu !!!', detail: 'Connexion réussi'});
      if(signIn({token: data?.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: {id:data?.id},
           })){ 
            const targetDashboard = '/dashboard';
            navigate(targetDashboard, { replace: true });
            }else {
              toast.current.show({severity: 'error', summary: 'Une erreur s\'est produite !! ', detail: 'Connexion Echoué'});
         }
    },
    onError:(_) => {
      toast.current.show({severity: 'error', summary: 'username et/ou mot de passe incorrect !!!', detail: 'Connexion Echoué'});
    }
  })

  const onConnect = data => {
     mutate(data);
    };

  return (
    <>
    <main className="mt-0 transition-all duration-200 ease-soft-in-out">
  <section>
    <div className="relative flex items-center p-0 overflow-hidden bg-center bg-cover min-h-screen">
      <div className="container z-10">
        <div className="flex flex-wrap mt-0 -mx-3">
          <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12">
            <div className="relative flex flex-col min-w-0  break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
            
              <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                <div className="flex flex-col items-center justify-center">
                <img src="/img/logo.png" alt="logo" className="h-60 w-60" />
                <p className="mb-0 text-lg font-semibold">FACTURE APP</p>
                </div>
              </div>
              <div className="flex-auto p-6">
                <form onSubmit={handleSubmit(onConnect)} method="POST">

                  <label className="mb-2 ml-1 font-bold text-xs text-slate-700">Telephone</label>
                  <Controller control={control} name="username" render={({field}) => (
                    <>
                    <div className="mb-4">
                    <input type="tel" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-blue-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-blue-300 focus:outline-none focus:transition-shadow" placeholder="Telephone" aria-label="Tel" aria-describedby="email-addon" autoFocus/>
                  </div>
                    </>
                     )}/>
                  {getFormErrorMessage('username')} 
                 
                  <label className="mb-2 ml-1 font-bold text-xs text-slate-700">Password</label>
                  <Controller control={control} name="password" render={({field}) => (
                    <>
                    <div className="mb-4">
                    <input type="password" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-blue-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-blue-300 focus:outline-none focus:transition-shadow" placeholder="Password" aria-label="Password" aria-describedby="password-addon" />
                  </div>
                    </>
                   )}/>
                    {getFormErrorMessage('password')} 
                  
    
                  <div className="text-center">
                    <button type="submit" className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-700 to-blue-300 hover:scale-102 hover:shadow-soft-xs active:opacity-85">Se connecter</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="w-full max-w-full px-3 lg:flex-0 shrink-0 md:w-6/12">
            <div className="absolute top-0 hidden w-3/5 h-full -mr-32 overflow-hidden -skew-x-10 -right-40 rounded-bl-xl md:block">
              <div className="absolute inset-x-0 top-0 z-0 h-full -ml-16 bg-cover bg-center skew-x-10" style={{backgroundImage: 'url("/img/bg_woman.jpg")'}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
<Toast ref={toast} />
    </>
  )
}

export default Login