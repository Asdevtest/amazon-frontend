import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

import { IPlatformSettings } from '@typings/shared/patform-settings'

dayjs.extend(utc)

const calculateQtySundays = (currentDate: Dayjs, needShipping: Dayjs): number => {
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
}

export const calculateRecommendedDeadline = (
  needShipping: Dayjs, // Need Shipping: Желаемая дата отправки
  maxProductionTime: number, // Max Production Time: Максимальный срок производства
) => {
  // Определяем текущее время (UTC)
  const currentDateUtc = dayjs.utc()
  const needShippingUtc = dayjs.utc(needShipping)
  // Забираем Time Reserve из настроек платформы(Админка)
  const timeReserve = (UserModel.platformSettings as unknown as IPlatformSettings)?.reserveTimeForOrder
  // Расчет Production Time
  const qtySundays = calculateQtySundays(currentDateUtc, needShippingUtc)
  // Рассчитываем количество воскресений в период между текущей датой и датой отправки
  const totalProductionTime = maxProductionTime + qtySundays
  // Рассчитываем Recommended Deadline
  const recommendedDeadline = needShippingUtc
    .subtract(timeReserve, 'day') // Вычитаем Time Reserve
    .subtract(totalProductionTime, 'day') // Вычитаем Production Time

  // Проверяем условия для уведомлений
  if (
    recommendedDeadline.isBefore(currentDateUtc, 'day') || // Recommended Deadline < Current Date
    recommendedDeadline.isSame(currentDateUtc, 'day') || // Recommended Deadline == Current Date
    recommendedDeadline.isSame(currentDateUtc.add(1, 'day'), 'day') // Recommended Deadline == Current Date + 1
  ) {
    toast.warning(t(TranslationKey['Recommended deadline is not valid']))
    return null
  }

  return dayjs(recommendedDeadline).format()
}
