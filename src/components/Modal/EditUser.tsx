'use client'
import { db } from '@/services/firebaseConnection'
import { setDoc, collection, updateDoc, doc } from 'firebase/firestore'
import React from 'react'

import { RegisterDebtProps } from '@/interfaces/allInterfaces'
import InputPrimario from '../InputPrimario'
import Notification from '../Notifier/Notification'

const EditUser = ({data}: {data: RegisterDebtProps | undefined}) => {

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
                Notification('success', 'Conta editada com sucesso')
            } catch (error) {
                Notification('error', 'Erro ao editar conta')
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
