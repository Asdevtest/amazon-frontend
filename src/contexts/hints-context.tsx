import React, { PropsWithChildren, useState } from 'react'

interface IHintsContext {
  hints: boolean
  setHints: (hints: boolean) => void
}

export const HintsContext = React.createContext<IHintsContext>({} as IHintsContext)

export const HintsContextProvider = ({ children }: PropsWithChildren) => {
  const setHints = (hints: boolean) => {
    setState(prevState => {
      return { ...prevState, hints }
    })
  }

  const initState = {
    hints: true,
    setHints,
  }
  const [state, setState] = useState(initState)

  return <HintsContext.Provider value={state}> {children}</HintsContext.Provider>
}
