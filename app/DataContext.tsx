'use client'
import {Card, Milestone} from '@graphql/types'
import React, { useState } from 'react'

interface IDataContext {
  cardModal: {
    open: boolean
    setOpen: (open: boolean) => void
    cardUuid: Card['uuid']
    setCardUuid: (uuid: Card['uuid']) => void
  }

  milestoneModal: {
    open: boolean
    setOpen: (open: boolean) => void
    milestoneUuid: Milestone['uuid']
    setMilestoneUuid: (uuid: Milestone['uuid']) => void
  }

  dragAndDrop: {
    isDragging: boolean
    setIsDragging: (isDragging: boolean) => void
    showDisposeArea: boolean
    setShowDisposeArea: (isShown: boolean) => void
  }
}

const defaultDataContext: IDataContext = {
  cardModal: {
    open: false,
    setOpen: () => {},
    cardUuid: '',
    setCardUuid: () => {},
  },

  milestoneModal: {
    open: false,
    setOpen: () => {},
    milestoneUuid: '',
    setMilestoneUuid: () => {},
  },

  dragAndDrop: {
    isDragging: false,
    setIsDragging: () => {},
    showDisposeArea: false,
    setShowDisposeArea: () => {},
  },
}

const Context = React.createContext<IDataContext>(defaultDataContext)

function DataContext({ children }: { children: React.ReactNode }) {
  const [cardModalOpen, setCardModalOpen] = useState(false)
  const [cardUuid, setCardUuid] = useState<Card['uuid']>('')

  const [milestoneModalOpen, setMilestoneModalOpen] = useState(false)
  const [milestoneUuid, setMilestoneUuid] = useState<Milestone['uuid']>('')

  const [isDragging, setIsDragging] = useState(false)
  const [showDisposeArea, setShowDisposeArea] = useState(false)

  const value: IDataContext = {
    cardModal: {
      open: cardModalOpen,
      setOpen: setCardModalOpen,
      cardUuid,
      setCardUuid,
    },

    milestoneModal: {
      open: milestoneModalOpen,
      setOpen: setMilestoneModalOpen,
      milestoneUuid,
      setMilestoneUuid,
    },

    dragAndDrop: {
      isDragging,
      setIsDragging,
      showDisposeArea,
      setShowDisposeArea,
    },
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
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
