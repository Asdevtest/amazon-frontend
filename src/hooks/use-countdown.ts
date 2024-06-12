import { useEffect, useState } from 'react'

const ZERO_PREFIX = '00'
const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24
const MILLISECONDS_IN_HOUR = 1000 * 60 * 60
const MILLISECONDS_IN_MINUTE = 1000 * 60
const MILLISECONDS_IN_SECOND = 1000

export const useCountdown = (targetDate: string | Date) => {
  const countDownDate = new Date(targetDate).getTime()

  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime())

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = countDownDate - now

      if (distance <= 0) {
        setCountDown(0)
        clearInterval(interval)
      } else {
        setCountDown(distance)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])

  return getReturnValues(countDown)
}

const getReturnValues = (countDown: number) => {
  const formatNumber = (num: number) => String(num).padStart(2, '0')

  if (countDown <= 0) {
    return {
      days: ZERO_PREFIX,
      hours: ZERO_PREFIX,
      minutes: ZERO_PREFIX,
      seconds: ZERO_PREFIX,
    }
  }

  const days = Math.floor(countDown / MILLISECONDS_IN_DAY)
  const hours = Math.floor((countDown % MILLISECONDS_IN_DAY) / MILLISECONDS_IN_HOUR)
  const minutes = Math.floor((countDown % MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE)
  const seconds = Math.floor((countDown % MILLISECONDS_IN_MINUTE) / MILLISECONDS_IN_SECOND)

  return {
    days: formatNumber(days),
    hours: formatNumber(hours),
    minutes: formatNumber(minutes),
    seconds: formatNumber(seconds),
  }
}
