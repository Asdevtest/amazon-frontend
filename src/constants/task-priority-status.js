import {objectFlip} from '@utils/object'
import {t} from '@utils/translations'

import {TranslationKey} from './translations/translation-key'

export const TaskPriorityStatus = {
  LONG: 'LONG',
  STANDART: 'STANDART',
  URGENT: 'URGENT',
}

export const mapTaskPriorityStatusEnum = {
  10: TaskPriorityStatus.LONG,
  20: TaskPriorityStatus.STANDART,
  30: TaskPriorityStatus.URGENT,
}

export const taskPriorityStatusTranslate = value => {
  switch (value) {
    case TaskPriorityStatus.LONG:
      return t(TranslationKey.Low)
    case TaskPriorityStatus.STANDART:
      return t(TranslationKey.Medium)
    case TaskPriorityStatus.URGENT:
      return t(TranslationKey.Urgent)
  }
}

export const colorByTaskPriorityStatus = status => {
  if ([TaskPriorityStatus.STANDART].includes(status)) {
    return '#F3AF00'
  } else if ([TaskPriorityStatus.LONG].includes(status)) {
    return '#00B746'
  } else if ([TaskPriorityStatus.URGENT].includes(status)) {
    return '#FF1616'
  } else {
    return '#black'
  }
}

export const mapTaskPriorityStatusEnumToKey = objectFlip(mapTaskPriorityStatusEnum, parseInt)
