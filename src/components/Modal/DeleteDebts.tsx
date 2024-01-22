'use client'
import { db } from '@/services/firebaseConnection'
import { setDoc, collection, updateDoc, doc } from 'firebase/firestore'
import React from 'react'
import { useToast } from "@/components/ui/use-toast"

import { RegisterDebtProps } from '@/interfaces/allInterfaces'

const DeleteDebts = ({data}: {data: RegisterDebtProps | undefined}) => {

    const { toast } = useToast()

    async function deleteDebts(){
        if (data) {
            try {
            await setDoc(doc(db, "debts", data.id ?? ""), {
                name: data.name,
                number: data.number,
                criacao: data.criacao,
                debts: []
              })
                window.location.reload()
                toast({
                    title: "Sucesso",
                    description: "Conta deletada com sucesso",
                    duration: 3000,
                    variant: "destructive",
                    color: "green",
                });
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
        <button className="btn" onClick={()=>(document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()}>Deletar Conta</button>
        <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg text-white">Deseja deletar esta conta?</h3>
            <div className="modal-action">
            <form className='flex gap-4' method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button onClick={() => deleteDebts()} className='btn px-7 bg-green-300 text-white hover:bg-red-500'>Sim</button>
                <button className="btn">Fechar</button>
            </form>
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default DeleteDebts
