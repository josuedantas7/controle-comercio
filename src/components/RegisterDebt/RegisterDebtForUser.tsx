"use client"
import React, { useEffect, useState } from 'react'
import InputPrimario from '../InputPrimario'
import { addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/services/firebaseConnection'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { DebtsProps } from '@/interfaces/allInterfaces'

import { RegisterDebtProps } from '@/interfaces/allInterfaces'
import Notification from '../Notifier/Notification'

import { useRouter } from 'next/navigation'

const RegisterDebtForUser = ({data} : { data: RegisterDebtProps | undefined}) => {

    const [qtd, setQtd] = useState<number>(1)
    const [item,setItem] = useState<string>('')
    const [value,setValue] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const router = useRouter()

    async function onSubmit() {
        let formatter = new Intl.DateTimeFormat('pt-BR');
        let date = new Date();
        let formattedDate = formatter.format(date);
        const updatedData: DebtsProps = {
            qtd,
            item,
            value,
            total,
            data: formattedDate
        };

        if (!data || !data.id) {
            console.error("Invalid data or missing ID");
            return;
        }

        const debtRef = doc(db, 'debts', data.id);

        try {
            await updateDoc(debtRef, {
                debts: [updatedData, ...data.debts]
            });
            Notification('success', 'Dívida cadastrada com sucesso')
        } catch (error) {
            Notification('error', 'Erro ao cadastrar dívida')
        }
    }

    useEffect(() => {
        function calcTotal(){
            setTotal(Number((qtd * value).toFixed(2)))
        }
        calcTotal()
    },[qtd,value])

    useEffect(() => {
        if (isNaN(qtd)) {
            setQtd(1)
        }
    },[qtd,item,value,total])


    function formatNumber(value: number) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    }

    return (
        <div className='text-white flex flex-col gap-3'>
            <div className="w-full flex flex-col gap-2">
                <Label htmlFor="email">Quantidade</Label>
                <Input className="text-black" onChange={(e) => setQtd(parseInt(e.target.value))} type="text" id="text" placeholder={`Quantidade`} />
            </div>
            <InputPrimario label='Nome do produto' onChange={setItem} />
            <div className="w-full flex flex-col gap-2">
                <Label htmlFor="email">Valor und:</Label>
                <Input className="text-black" onChange={(e) => setValue(parseFloat(e.target.value))} type="text" id="text" placeholder={`Valor do produto`} />
            </div>
            <div className="w-full flex flex-col gap-2">
                <Label htmlFor="email">Valor total:</Label>
                <p>{!isNaN(total) ? formatNumber(total) : '' }</p>
            </div>
            <form method='dialog'>
                <button className='w-full text-center bg-green-300 py-2 rounded-lg mt-2' onClick={() => onSubmit()}>Cadastrar</button>
            </form>
        </div>
    )
}

export default RegisterDebtForUser
