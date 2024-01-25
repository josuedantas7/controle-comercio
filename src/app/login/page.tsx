'use client'
import InputPrimario from '@/components/InputPrimario'
import { AuthContext } from '@/contexts/AuthContext';
import { auth } from '@/services/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Notification from '@/components/Notifier/Notification';

interface UserProps{
  name: string | null
  email: string | null
  uid: string | null
}

interface AuthContextProps{
  signed: boolean
  loading: boolean
  user: UserProps | null
  login: (email: string, name: string, uid: string) => void
}

const Login = () => {

  const { signed, loading, user, login } = useContext(AuthContext);

  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')


  async function onSubmit(){
    const data = {
      email,
      password
    }

    await signInWithEmailAndPassword(auth, data.email, data.password)
    .then((user) => {
      login(user?.user.email, user.user.displayName, user.user.uid)
      Notification('success', 'Usuário logado com sucesso')
      router.push('/')
    })
    .catch((err) => {
      Notification('error', 'Erro ao logar usuário')
    })
  }

  return (
    <div className='w-full h-screen flex justify-center items-center flex-col'>
        <div>
          <h1 className='text-3xl font-bold mb-12'>Faça login</h1>
        </div>
        <div className='w-[500px] mx-auto bg-gray-100 rounded-2xl flex flex-col gap-4 border-2 p-8'>
          <CgProfile size={50} className='-translate-y-[60px] text-white bg-black rounded-full mx-auto' />
          <InputPrimario onChange={setEmail} label='Email' />
          <div className="w-full flex flex-col gap-2">
            <Label className={`text-black`} htmlFor="senha">Senha</Label>
            <Input type='password' onChange={(e) => setPassword(e.target.value)} className="text-black" id="senha" placeholder={`Senha`} />
          </div>
          <button onClick={() => onSubmit()} className='w-full bg-green-500 rounded-lg hover:bg-green-300 text-white font-bold py-2'>Logar</button>
        </div>
    </div>
  )
}

export default Login
