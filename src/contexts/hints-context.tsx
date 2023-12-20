import React, { useState } from 'react'

interface IHintsContext {
  hints: boolean
  setHints: (hints: boolean) => void
}
export const HintsContext = React.createContext<IHintsContext>({} as IHintsContext)

export const HintsContextProvider = (props: any) => {
  const setHints = (hints: boolean) => {
    setState({ ...state, hints })
  }

  const initState = {
    hints: true,
    setHints,
  }

  const [state, setState] = useState(initState)

  return <HintsContext.Provider value={state}> {props.children}</HintsContext.Provider>
}
