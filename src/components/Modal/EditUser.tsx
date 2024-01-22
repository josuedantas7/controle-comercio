'use client'
import { db } from '@/services/firebaseConnection'
import { setDoc, collection, updateDoc, doc } from 'firebase/firestore'
import React from 'react'
import { useToast } from "@/components/ui/use-toast"

import { RegisterDebtProps } from '@/interfaces/allInterfaces'
import InputPrimario from '../InputPrimario'

const EditUser = ({data}: {data: RegisterDebtProps | undefined}) => {

    const { toast } = useToast()

    const[user, setUser] = React.useState<string>('')

    async function EditUser(){
        if (data) {
            try {
            await setDoc(doc(db, "debts", data.id ?? ""), {
                name: user,
                number: data.number,
                criacao: data.criacao,
                debts: data.debts
              })
                window.location.reload()
                toast({
                    title: "Sucesso",
                    description: "Conta editada com sucesso",
                    duration: 3000,
                    variant: "destructive",
                    color: "green",
                });
            } catch (error) {
                toast({
                    title: "Erro",
                    description: "Erro ao editar conta",
                    duration: 3000,
                    variant: "destructive",
                    color: "red",
                })
            }
        }
        
    }

  return (
    <div>
        <button className="btn" onClick={()=>(document.getElementById('my_modal_4') as HTMLDialogElement)?.showModal()}>Editar Usuário</button>
        <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg text-white mb-4">Editar usuário</h3>
            <InputPrimario branco={true} label='Nome do cliente' onChange={setUser} />
            <div className="modal-action">
                <form className='flex gap-4' method="dialog">
                    <button onClick={() => EditUser()} className='btn px-7 bg-green-300 text-white hover:bg-red-500'>Salvar</button>
                    <button className="btn">Fechar</button>
                </form>
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default EditUser
