"use client"
import React, { useEffect, useState } from 'react'
import InputPrimario from '../InputPrimario'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/services/firebaseConnection'

import { useRouter } from 'next/navigation'
import { RegisterDebtProps } from '@/interfaces/allInterfaces'
import Notification from '../Notifier/Notification'

const RegisterDebt = () => {

    const [name,setName] = useState<string>('')
    const [number,setNumber] = useState<string>('')

    const router = useRouter()

    async function onSubmit(){
        let formatter = new Intl.DateTimeFormat('pt-BR');
        let date = new Date();
        let formattedDate = formatter.format(date);
        const data : RegisterDebtProps = {
            name,
            number,
            criacao: formattedDate,
            debts: []
        }

        await addDoc(collection(db, 'debts'), data)
        .then(() => {
            clearFields()
            Notification('success', 'Cliente cadastrado com sucesso')
            router.push('/contas')
        }).catch(() => {
            Notification('error', 'Erro ao cadastrar cliente')
        })
    }

    function clearFields(){
        setName('')
        setNumber('')
    }
    return (
        <div className='text-white flex flex-col gap-3'>
            <InputPrimario label='Nome' onChange={setName} />
            <InputPrimario label='Número de telefone' onChange={setNumber} />
            <form method='dialog'>
                <button className='btn w-full text-center bg-green-300 py-2 rounded-lg mt-2' onClick={() => onSubmit()}>Cadastrar</button>
            </form>
        </div>
    )
}

export default RegisterDebt
