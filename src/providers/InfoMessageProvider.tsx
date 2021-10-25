import React, {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface InfoMessageProviderValue {
  messageQueue: InfoMessage[]
  pushMessage: (infoMessage: InfoMessage) => InfoMessage
}

export interface InfoMessage {
  message: string
}

const InfoMessageContext = createContext({} as InfoMessageProviderValue)

function InfoMessageProvider({ children }: { children: ReactNode }): ReactElement {
  const [messageQueue, setMessageQueue] = useState<InfoMessage[]>([])

  const pushMessage = useCallback(
    (infoMessage: InfoMessage) => {
      if (infoMessage) {
        messageQueue.push(infoMessage)
        setMessageQueue([...messageQueue])
      }
      return infoMessage
    },
    [messageQueue, setMessageQueue],
  )

  useEffect(() => {
    if (!messageQueue.length) return
  }, [messageQueue, setMessageQueue])

  return (
    <InfoMessageContext.Provider
      value={
        {
          pushMessage,
          messageQueue,
        } as InfoMessageProviderValue
      }
    >
      {children}
    </InfoMessageContext.Provider>
  )
}

// Helper hook to access the provider values
const useInfoMessage = (): InfoMessageProviderValue => useContext(InfoMessageContext)

export { InfoMessageProvider, useInfoMessage, InfoMessageContext }
export default InfoMessageProvider
