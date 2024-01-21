'use client'
import { useState, createContext, useEffect } from "react";

import { AllDebts } from '@/interfaces/allInterfaces'

export const DebtsContext = createContext({})

function DebtsProvider({children} : { children : React.ReactNode }) {

    const [debts, setDebts] = useState<AllDebts[]>([])

    return (
        <DebtsContext.Provider value={{}}>
            {children}
        </DebtsContext.Provider>
    )
}

export default DebtsProvider
