export const debounce = (fn: any, delay: number = 500) => {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: any[]) => {
    const fnCall = () => fn(...args)

    clearTimeout(timeout)

    timeout = setTimeout(fnCall, delay)
  }
}
