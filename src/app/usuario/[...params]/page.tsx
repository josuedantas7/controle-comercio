import { db } from '@/services/firebaseConnection'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { RegisterDebtProps } from '@/interfaces/allInterfaces'
import ModalAddDebts from '@/components/Modal/ModalAddDebts'
import DeleteDebts from '@/components/Modal/DeleteDebts'
import DeleteUserDebts from '@/components/Modal/DeleteUserDebts'
import EditUser from '@/components/Modal/EditUser'

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
        <div className='bg-blue-200 w-[85%] max-[900px]:w-[95%] mx-auto rounded-2xl h-[700px] relative'>
            <div className='border-b items-center flex justify-between px-3 max-[600px]:flex-col border-gray-900 '>
                <h1 className='text-2xl max-[900px]:text-lg'>
                    <span className='font-semibold'>Telefone: </span>
                    <span>{data?.number}</span>
                </h1>
                <h1 className='text-3xl font-bold  text-center max-[900px]:text-xl py-3 max-[600px]:py-0'>
                    {data?.name}
                </h1>
                <h1 className='text-2xl max-[900px]:text-lg'>
                    <span className='font-semibold'>Data: </span>
                    <span>{data?.criacao}</span>
                </h1>
            </div>
            <div>
                <div className='flex justify-between text-2xl items-center border-b border-gray-900 font-semibold h-12 max-[900px]:text-lg'>
                    <h1 className='text-center w-1/5'>Data</h1>
                    <h1 className='text-center w-1/5'>Item</h1>
                    <h1 className='text-center w-1/5'>Qtd</h1>
                    <h1 className='text-center w-1/5'>Valor</h1>
                    <h1 className='text-center w-1/5'>Total</h1>
                </div>
                {data?.debts.length === 0 && (
                    <h1 className='text-2xl text-center font-semibold mt-4'>Nenhuma dívida encontrado</h1>
                )}
                {data?.debts.map((item, index) => {
                    return (
                        <div key={index} className='flex justify-between text-2xl items-center max-[900px]:text-lg border-b border-gray-900'>
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
                <h1 className='absolute text-2xl max-[700px]:text-lg font-semibold right-0 bottom-32'>
                    Valor Total: {formatNumber(data?.debts.reduce((acc, item) => acc + item.total, 0))}
                </h1>
            ): ''}
            <div className='absolute flex gap-12 justify-center items-center bottom-16 left-0 right-0 max-[700px]:gap-2 flex-wrap max-[600px]:bottom-6'>
                <ModalAddDebts data={data ?? data} />
                <DeleteDebts data={data ?? data}/>
                <DeleteUserDebts data={data ?? data} />
                <EditUser data={data ?? data} />
            </div>
        </div>
    </div>
  )
}

export default Usuario
