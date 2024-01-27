'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '@/contexts/AuthContext'
import Image from 'next/image'
import ImageSrc from './img/J-image.jpg'

const Header = () => {

  const { signed, user, logout } = useContext(AuthContext)

  return (
    <div className='bg-blue-300 px-32 py-3 flex justify-between max-[1000px]:px-12 max-[450px]:flex-col max-[450px]:gap-2 items-center'>
        <Link href={`/`} className='font-bold max-[450px]:text-center hover:tracking-widest duration-300 text-white'>Comercial Luna</Link>
        <div className='flex gap-4 max-[450px]:justify-center items-center'>
            {signed ? <Image alt='Imagem de perfil' src={ImageSrc} className='text-white font-bold w-[35px] h-[35px] rounded-full hover:scale-110 duration-300' /> : <Link href={'/login'} className='text-white'>Login</Link>}
            <Link href={'/contas'} className='text-white hover:scale-110 duration-300'>Contas</Link>
            <Link href={'/cervejas'} className='text-white hover:scale-110 duration-300'>Cervejas</Link>
            {signed && <button className='text-white hover:scale-110 duration-300' onClick={() => logout()}>Sair</button>}
        </div>
    </div>
  )
}

export default Header
