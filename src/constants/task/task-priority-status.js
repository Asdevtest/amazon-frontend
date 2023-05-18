import { objectFlip } from '@utils/object'
import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

export const TaskPriorityStatus = {
  LONG: 'LONG',
  STANDART: 'STANDART',
  URGENT: 'URGENT',
  PROBLEMATIC: 'PROBLEMATIC',
}

export const mapTaskPriorityStatusEnum = {
  10: TaskPriorityStatus.LONG,
  20: TaskPriorityStatus.STANDART,
  30: TaskPriorityStatus.URGENT,
  40: TaskPriorityStatus.PROBLEMATIC,
}

export const taskPriorityStatusTranslate = value => {
  switch (value) {
    case TaskPriorityStatus.LONG:
      return t(TranslationKey.TASK_LOW_PRIORITY_KEY)
    case TaskPriorityStatus.STANDART:
      return t(TranslationKey.TASK_STANDART_PRIORITY_KEY)
    case TaskPriorityStatus.URGENT:
      return t(TranslationKey.Urgent)
    case TaskPriorityStatus.PROBLEMATIC:
      return t(TranslationKey.Problematic)
  }
}

export const colorByTaskPriorityStatus = status => {
  if ([TaskPriorityStatus.STANDART].includes(status)) {
    return '#F3AF00'
  } else if ([TaskPriorityStatus.LONG].includes(status)) {
    return '#00B746'
  } else if ([TaskPriorityStatus.URGENT, TaskPriorityStatus.PROBLEMATIC].includes(status)) {
    return '#FF1616'
  } else {
    return '#black'
  }
}

export const mapTaskPriorityStatusEnumToKey = objectFlip(mapTaskPriorityStatusEnum, parseInt)
