import { useEffect, useState } from 'react'

export const useToggleNavbar = () => {
  const [shortNavbar, setShortNavbar] = useState(() => {
    const saved = localStorage.getItem('shortNavbar')
    const initialValue = JSON.parse(saved)
    return initialValue || window.innerWidth < 1282 ? true : false
  })

  useEffect(() => {
    localStorage.setItem('shortNavbar', JSON.stringify(shortNavbar))
  }, [shortNavbar])

  return { shortNavbar, setShortNavbar }
}
