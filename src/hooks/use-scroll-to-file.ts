import { useEffect, useRef } from 'react'

export const useScrollToFile = (dependency: unknown) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const childElement = ref.current

    if (!childElement) {
      return
    }

    const parentElement = childElement.parentElement

    if (!parentElement) {
      return
    }

    const parentRect = parentElement.getBoundingClientRect()
    const childRect = childElement.getBoundingClientRect()

    const offset = (parentRect.height - childRect.height) / 2

    const top = childRect.top - parentRect.top + parentElement.scrollTop - offset

    parentElement.scrollTo({ top })
  }, [dependency])

  return ref
}
