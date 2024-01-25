'use client'
import React, { useState, useEffect } from 'react'
import { AllDebts } from '@/interfaces/allInterfaces'
import { db } from '@/services/firebaseConnection'
import { collection, getDocs, query } from 'firebase/firestore'
import Link from 'next/link'

import { FiLoader } from 'react-icons/fi'

export default function GetAllDebts(){

    const [debts, setDebts] = useState<AllDebts>([])
    const [loading,setLoading] = useState<boolean>(true)

    async function getData() {

        const debtsRef = collection(db, 'debts')
        const queryRef = query(debtsRef)
    
        await getDocs(queryRef)
        .then((snapshot) => {
            const allDebts = [] as AllDebts
    
            snapshot.forEach((doc) => {
                allDebts.push({
                    id: doc.id,
                    name: doc.data().name,
                    number: doc.data().number,
                    criacao: doc.data().criacao,
                    debts: doc.data().debts
                })
            })
            setDebts(allDebts)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
        })
      }

      useEffect(() => {
        getData()
      },[])

  return (
    <div className='flex flex-wrap justify-center gap-4 px-20 max-[480px]:px-4'>
        {loading ? (
            <div className='flex flex-col justify-center gap-4'>
                <h1 className='text-3xl'>Carregando clientes...</h1>
                <FiLoader size={150} className='mx-auto animate-spin' />
            </div>
        ) : (
            debts.map((debt) => (
                <Link href={`/usuario/${debt.id}`} className='border-2 p-4 w-[300px] rounded-lg' key={debt.id}>
                    <div>
                        <span className='text-2xl'>Nome: </span>
                        <span className='text-2xl font-bold'>{debt.name}</span>
                    </div>
                    <div>
                        <span className='text-xl'>Número: </span>
                        <span className='text-xl font-bold'>{debt.number}</span>
                    </div>
                    <div>
                        <span className='text-xl'>Data de criação: </span>
                        <span className='text-xl font-bold'>{debt.criacao}</span>
                    </div>
                </Link>
            ))
        )}
    </div>
  )
}
