'use client'
import GetAllDebts from '@/components/GetAllDebts/GetAllDebts'
import React from 'react'

const Contas = () => {

  return (
    <div>
        <h1 className='text-[50px] text-center font-semibold my-2 max-[790px]:text-[30px]'>Contas cadastradas no sistema</h1>
        <GetAllDebts />
    </div>
  )
}

export default Contas
