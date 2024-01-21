"use client"
import React, { useEffect, useState } from 'react'
import InputPrimario from '../InputPrimario'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/services/firebaseConnection'

import { useToast } from "@/components/ui/use-toast"

import { RegisterDebtProps } from '@/interfaces/allInterfaces'

const RegisterDebt = () => {

    const [name,setName] = useState<string>('')
    const [number,setNumber] = useState<string>('')
    const { toast } = useToast()

    async function onSubmit(){
        let formatter = new Intl.DateTimeFormat('pt-BR');
        let date = new Date();
        let formattedDate = formatter.format(date);
        console.log(formattedDate);
        const data : RegisterDebtProps = {
            name,
            number,
            criacao: formattedDate,
            debts: []
        }

        await addDoc(collection(db, 'debts'), data)
        .then(() => {
            toast({
                title: "Sucesso",
                description: "Cliente cadastrado com sucesso",
                duration: 3000,
                variant: "destructive",
                color: "green",
            }),
            window.location.reload()
        }).catch((err) => {
            toast({
                title: "Erro",
                description: "Erro ao cadastrar cliente",
                duration: 3000,
                variant: "destructive",
                color: "red",
            })
        })
    }
    return (
        <div className='text-white flex flex-col gap-3'>
            <InputPrimario label='Nome' onChange={setName} />
            <InputPrimario label='Número de telefone' onChange={setNumber} />
            <button className='w-full text-center bg-green-300 py-2 rounded-lg mt-2' onClick={() => onSubmit()}>Cadastrar</button>
        </div>
    )
}

export default RegisterDebt
