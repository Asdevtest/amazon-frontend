import dayjs, { Dayjs } from 'dayjs'
// import utc from 'dayjs/plugin/utc'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

import { IPlatformSettings } from '@typings/shared/patform-settings'

// dayjs.extend(utc)

const staticSundayRanges = [
  { min: 1, max: 7, qtySundays: 1 },
  { min: 8, max: 14, qtySundays: 2 },
  { min: 15, max: 21, qtySundays: 3 },
  { min: 22, max: 28, qtySundays: 4 },
  { min: 29, max: 35, qtySundays: 5 },
  { min: 36, max: 42, qtySundays: 6 },
  { min: 43, max: 49, qtySundays: 7 },
  { min: 50, max: Infinity, qtySundays: 8 },
]

const calculateStaticQtySundays = (maxProductionTime: number): number => {
  if (maxProductionTime <= 0) {
    return 0
  }

  for (const range of staticSundayRanges) {
    if (maxProductionTime >= range.min && maxProductionTime <= range.max) {
      return range.qtySundays
    }
  }

  return 0
}

/* const calculateQtySundays = (currentDate: Dayjs, needShipping: Dayjs): number => {
  let count = 0

  const daysBetween = needShipping.diff(currentDate, 'day') // Вычисляем количество дней между текущей датой и датой отправки

  for (let i = 0; i <= daysBetween; i++) {
    const date = currentDate.add(i, 'day')

    // Проверяем, является ли день воскресеньем
    if (date.day() === 0) {
      count++
    }
  }

  return count
} */

export const calculateRecommendedDeadline = (
  needShipping: Dayjs | null, // Need Shipping: Желаемая дата отправки
  maxProductionTime: number, // Max Production Time: Максимальный срок производства
) => {
  // Забираем Time Reserve из настроек платформы(Админка)
  const timeReserve = (UserModel.platformSettings as unknown as IPlatformSettings)?.reserveTimeForOrder
  // Если Need Shipping = null, то возвращаем пустой объект
  const emptyResult = {
    recommendedDeadline: null,
    timeReserve,
    qtySundays: 0,
  }

  if (!needShipping) {
    return emptyResult
  }

  // Определяем текущее время
  const currentDate = dayjs()
  const needShippingDate = dayjs(needShipping)

  // Расчет количества выходных дней - воскресений
  // const qtySundays = calculateQtySundays(currentDate, needShippingDate) // - это самое верное решение (диначимески считать количество выходных дней, но тогда обратный расчет будет местами не сходиться со статикой)
  const qtySundays = calculateStaticQtySundays(maxProductionTime)

  // Рассчитываем Recommended Deadline
  const recommendedDeadline = needShippingDate
    .subtract(timeReserve, 'day') // Вычитаем Time Reserve
    .subtract(maxProductionTime, 'day') // Вычитаем Production Time
    .subtract(qtySundays, 'day') // Вычитаем количество выходных дней

  // Проверяем условия для уведомлений
  if (
    recommendedDeadline.isBefore(currentDate.add(2, 'day'), 'day') // Recommended Deadline < Current Date + 2
  ) {
    toast.warning(
      t(
        TranslationKey[
          'The selected shipping date does not correspond to the acceptable range based on the manufacturing and preparation time of the product'
        ],
      ),
    )
    return emptyResult
  }

  return {
    recommendedDeadline, // возвращаем строго локальное время - UTC только при отправке на бек
    timeReserve,
    qtySundays,
  }
}

export const calculateShippingDate = (
  selectedDeadline: Dayjs | null, // Выбранный дедлайн
  maxProductionTime: number, // Max Production Time: Максимальный срок производства
) => {
  if (!selectedDeadline) {
    return null
  }

  // Забираем Time Reserve из настроек платформы(Админка)
  const timeReserve = (UserModel.platformSettings as unknown as IPlatformSettings)?.reserveTimeForOrder

  // Определяем время выбранного дедлайна
  const selectedDeadlineDate = dayjs(selectedDeadline)

  // Расчет статически количества выходных дней - воскресений
  const qtySundays = calculateStaticQtySundays(maxProductionTime)

  // Рассчитываем Recommended Deadline
  const recommendedShippingDate = selectedDeadlineDate
    .add(timeReserve, 'day') // Добавляем Time Reserve
    .add(maxProductionTime, 'day') // Добавляем Production Time
    .add(qtySundays, 'day') // Добавляем выходные дни

  if (recommendedShippingDate.day() === 0) {
    // Если расчетный день - воскресенье, то берем следующий день
    const nextDay = recommendedShippingDate.add(1, 'day')

    return nextDay
  }

  return recommendedShippingDate // возвращаем строго локальное время - UTC только при отправке на бек
}
