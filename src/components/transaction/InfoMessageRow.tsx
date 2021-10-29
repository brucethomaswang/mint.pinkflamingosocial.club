import { CloseModalButton, FloatingNotification, InfoMessage } from './TransactionStatusStyles'
import React, { useState } from 'react'

interface InfoMessageRowProps {
  message: string
}

const InfoMessageRow = ({ message }: InfoMessageRowProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  if (!isOpen) return null

  return (
    <FloatingNotification>
      <InfoMessage>{message}</InfoMessage>
      <CloseModalButton onClick={handleToggle}>X</CloseModalButton>
    </FloatingNotification>
  )
}

export default InfoMessageRow
