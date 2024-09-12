export const throttle = (callback?: (...args: any[]) => void, delay: number = 2000) => {
  let throttleFlag = false

  return (...args: any[]) => {
    if (!throttleFlag && callback) {
      callback(...args)
      throttleFlag = true

      setTimeout(() => {
        throttleFlag = false
      }, delay)
    }
  }
}
