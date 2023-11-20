"use client"
import { Card } from '@graphql/types'
import React, { useState } from 'react'

interface IDataContext {
  cardModal: {
    open: boolean
    setOpen: (open: boolean) => void
    cardUuid: Card['uuid']
    setCardUuid: (uuid: Card['uuid']) => void
  }
}

const Context = React.createContext<IDataContext | null>(null)

function DataContext({children}: {children: React.ReactNode}) {
  const [cardModalOpen, setCardModalOpen] = useState(false)
  const [cardUuid, setCardUuid] = useState<Card['uuid']>('')

  const value: IDataContext = {
    cardModal: {
      open: cardModalOpen,
      setOpen: setCardModalOpen,
      cardUuid,
      setCardUuid,
    },
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

function useDataContext() {
  const context = React.useContext(Context)
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataContext')
  }

  return context
}

export { DataContext, useDataContext }
export type { IDataContext }