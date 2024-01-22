'use client'
import { AuthContext } from '@/contexts/AuthContext'
import React, { ReactNode, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const ContainerLogged = ({children} : { children: ReactNode }) => {

    const { signed, loading, user } = useContext(AuthContext)

    const router = useRouter()


    useEffect(() => {
        if (!loading) {
            if (!signed) {
                router.push('/login')
            }
        }
    },[user,loading,router,signed,user])
  return (
    <div>
        {children}
    </div>
  )
}

export default ContainerLogged