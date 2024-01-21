import { db } from '@/services/firebaseConnection'
import { doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { RegisterDebtProps } from '@/interfaces/allInterfaces'
import ModalAddDebts from '@/components/Modal/ModalAddDebts'

interface UsuarioProps {
    params: string[]
}


async function getData(id : string) {

    const debtsRef = doc(db, 'debts', id)


    const docSnap = await getDoc(debtsRef)
    if (docSnap.exists()) {
        
        return {
            id: docSnap.id,
            ...docSnap.data()
        } as RegisterDebtProps
    }
    return
}

async function Usuario({params} : { params : UsuarioProps}){

    let id = params.params[0]

    const data = await getData(id)

    console.log(data)

    function formatNumber(value: number) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    }

  return (
    <div className='pt-20'>
        <div className='bg-blue-200 w-[85%] mx-auto rounded-2xl h-[800px] relative'>
            <div className='relative border-b h-16 items-center flex border-gray-900'>
                <h1 className='absolute left-4 text-2xl'>
                    <span className='font-semibold'>Telefone: </span>
                    <span>{data?.number}</span>
                </h1>
                <h1 className='text-3xl font-bold absolute left-0 right-0 text-center py-3'>
                    {data?.name}
                </h1>
                <h1 className='absolute text-2xl right-4'>
                    <span className='font-semibold'>Data: </span>
                    <span>{data?.criacao}</span>
                </h1>
            </div>
            <div>
                <div className='flex justify-between text-2xl items-center border-b border-gray-900 font-semibold h-12'>
                    <h1 className='text-center w-1/5'>Data</h1>
                    <h1 className='text-center w-1/5'>Item</h1>
                    <h1 className='text-center w-1/5'>Quantidade</h1>
                    <h1 className='text-center w-1/5'>Valor</h1>
                    <h1 className='text-center w-1/5'>Total</h1>
                </div>
                {data?.debts.map((item, index) => {
                    return (
                        <div key={index} className='flex justify-between text-2xl items-center border-b border-gray-900'>
                            <h1 className='text-center py-2 w-1/5'>{item.data}</h1>
                            <h1 className='text-center py-2 w-1/5'>{item.item}</h1>
                            <h1 className='text-center py-2 w-1/5'>{item.qtd}</h1>
                            <h1 className='text-center py-2 w-1/5'>{formatNumber(item.value)}</h1>
                            <h1 className='text-center py-2 w-1/5'>{formatNumber(item.total)}</h1>
                        </div>
                    )
                })}
            </div>
            {data?.debts ? (
                <h1 className='absolute text-2xl font-semibold right-0 bottom-28'>
                    Valor Total: {formatNumber(data?.debts.reduce((acc, item) => acc + item.total, 0))}
                </h1>
            ): ''}
            <div className='absolute  left-0 right-0 bottom-8'>
                <ModalAddDebts data={data ?? data} />
            </div>
        </div>
    </div>
  )
}

export default Usuario
