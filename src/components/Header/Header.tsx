import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='bg-blue-300 px-32 py-3 flex justify-between max-[1000px]:px-12 max-[450px]:flex-col max-[450px]:gap-2'>
        <Link href={`/`} className='font-bold max-[450px]:text-center text-white'>Comercial Luna</Link>
        <div className='flex gap-4 max-[450px]:justify-center'>
            <Link href={'/login'} className='text-white'>Login</Link>
            <Link href={'/contas'} className='text-white'>Contas</Link>
            <Link href={'/'} className='text-white'>Home</Link>
        </div>
    </div>
  )
}

export default Header
