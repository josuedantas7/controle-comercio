import React, { useState } from 'react'
import { AllDebts } from '@/interfaces/allInterfaces'
import { db } from '@/services/firebaseConnection'
import { collection, getDocs, query } from 'firebase/firestore'
import Link from 'next/link'


async function getData() {

    const debtsRef = collection(db, 'debts')
    const queryRef = query(debtsRef)

    let data = await getDocs(queryRef)
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
        return allDebts
    })

    return data
  }

export default async function GetAllDebts(){

    const debts : AllDebts = await getData()

  return (
    <div className='flex flex-wrap justify-center gap-4 px-20'>
        {debts.map((debt) => (
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
        ))}
    </div>
  )
}
