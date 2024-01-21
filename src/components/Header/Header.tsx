import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='bg-blue-300 px-32 py-3 flex justify-between'>
        <Link href={`/`} className='font-bold text-white'>Comercial Luna</Link>
        <div className='flex gap-4'>
            <Link href={'/login'} className='text-white'>Login</Link>
            <Link href={'/contas'} className='text-white'>Contas</Link>
            <Link href={'/'} className='text-white'>Home</Link>
        </div>
    </div>
  )
}

export default Header
