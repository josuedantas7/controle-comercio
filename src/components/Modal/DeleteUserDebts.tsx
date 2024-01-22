'use client'
import { db } from '@/services/firebaseConnection'
import { setDoc, collection, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import React from 'react'
import { useToast } from "@/components/ui/use-toast"

import { useRouter } from 'next/navigation'

import { RegisterDebtProps } from '@/interfaces/allInterfaces'

const DeleteUserDebts = ({data}: {data: RegisterDebtProps | undefined}) => {

    const { toast } = useToast()

    const router = useRouter()

    async function deleteUserDebts(){
        if (data) {
            try {
            await deleteDoc(doc(db, "debts", data.id ?? ""))
            toast({
                title: "Sucesso",
                description: "Conta excluida com sucesso",
                duration: 3000,
                variant: "destructive",
                color: "green",
            });
            setTimeout(() => {
                window.location.reload()
            },1000)
            router.push('/')
            } catch (error) {
                toast({
                    title: "Erro",
                    description: "Erro ao deletar conta",
                    duration: 3000,
                    variant: "destructive",
                    color: "red",
                })
            }
        }
        
    }

  return (
    <div>
        <button className="btn" onClick={()=>(document.getElementById('my_modal_3') as HTMLDialogElement)?.showModal()}>Excluir Cliente</button>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg text-white">Deseja excluir a conta deste cliente?</h3>
            <div className="modal-action">
            <form className='flex gap-4' method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button onClick={() => deleteUserDebts()} className='btn px-7 bg-green-300 text-white hover:bg-red-500'>Sim</button>
                <button className="btn">Fechar</button>
            </form>
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default DeleteUserDebts
