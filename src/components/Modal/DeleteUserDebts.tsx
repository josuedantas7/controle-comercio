'use client'
import { db } from '@/services/firebaseConnection'
import { setDoc, collection, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import React from 'react'

import { useRouter } from 'next/navigation'

import { RegisterDebtProps } from '@/interfaces/allInterfaces'
import Notification from '../Notifier/Notification'

const DeleteUserDebts = ({data}: {data: RegisterDebtProps | undefined}) => {


    const router = useRouter()

    async function deleteUserDebts(){
        if (data) {
            try {
            await deleteDoc(doc(db, "debts", data.id ?? ""))
            Notification('success', 'Conta deletada com sucesso')
            router.push('/')
            } catch (error) {
                Notification('error', 'Erro ao deletar conta')
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
