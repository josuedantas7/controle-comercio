'use client'
import InputPrimario from '@/components/InputPrimario'
import { AuthContext } from '@/contexts/AuthContext';
import { auth } from '@/services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface UserProps{
  name: string
  email: string
  password: string
}

const Cadastro = () => {

  const { signed, loading, user, login } = useContext(AuthContext);

  const router = useRouter()
  const { toast } = useToast()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')


  async function onSubmit(){
    const data : UserProps = {
        name,
        email,
        password
    }

    await createUserWithEmailAndPassword(auth, data.email, data.password)
    .then( async(user) => {
        await updateProfile(user.user, {
            displayName: data.name
        })
        console.log(user)
        login(user?.user.email, user.user.displayName, user.user.uid)
        toast({
            title: "Cadastro efetuado com sucesso",
            description: "Você será redirecionado para a página inicial",
            duration: 2000,
            variant: "destructive"
        })
        router.push('/')
    })
    .catch((err) => {
        console.log(err)
        toast({
            title: "Erro ao efetuar cadastro",
            description: err.message,
            duration: 2000,
            variant: "destructive"
        })
    })
  }

  return (
    <div className='w-full h-screen flex justify-center items-center flex-col'>
        <div>
          <h1 className='text-3xl font-bold mb-12'>Faça seu cadastro</h1>
        </div>
        <div className='w-[500px] mx-auto bg-gray-100 rounded-2xl flex flex-col gap-4 border-2 p-8'>
          <CgProfile size={50} className='-translate-y-[60px] text-white bg-black rounded-full mx-auto' />
          <InputPrimario onChange={setName} label='Nome' />
          <InputPrimario onChange={setEmail} label='Email' />
          <div className="w-full flex flex-col gap-2">
            <Label className={`text-black`} htmlFor="senha">Senha</Label>
            <Input type='password' onChange={(e) => setPassword(e.target.value)} className="text-black" id="senha" placeholder={`Senha`} />
          </div>
          <button onClick={() => onSubmit()} className='w-full bg-green-500 rounded-lg hover:bg-green-300 text-white font-bold py-2'>Cadastrar</button>
        </div>
    </div>
  )
}

export default Cadastro
