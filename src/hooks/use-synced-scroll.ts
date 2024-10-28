import React, { useRef } from 'react'

export const useSyncedScrollAll = (numberOfDivs: number) => {
  const divRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(
    Array.from({ length: numberOfDivs }, () => React.createRef<HTMLDivElement>()),
  )

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = event.currentTarget

    divRefs.current.forEach(ref => {
      if (ref.current && ref.current !== event.currentTarget) {
        ref.current.scrollTop = scrollTop
      }
    })
  }

  return [divRefs.current, handleScroll] as const
}
