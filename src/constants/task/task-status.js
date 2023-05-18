import { objectFlip } from '@utils/object'
import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

export const TaskStatus = {
  NEW: 'NEW',
  AT_PROCESS: 'AT_PROCESS',
  SOLVED: 'SOLVED',
  NOT_SOLVED: 'NOT_SOLVED',
}

export const mapTaskStatusKeyToEnum = {
  0: TaskStatus.NEW,
  10: TaskStatus.AT_PROCESS,
  20: TaskStatus.SOLVED,
  30: TaskStatus.NOT_SOLVED,
}

export const TaskStatusTranslate = status => {
  switch (status) {
    case TaskStatus.NEW:
      return t(TranslationKey.New)
    case TaskStatus.AT_PROCESS:
      return t(TranslationKey['At process'])
    case TaskStatus.NOT_SOLVED:
      return t(TranslationKey['Not solved'])
    case TaskStatus.SOLVED:
      return t(TranslationKey.Solved)
  }
}

export const mapTaskStatusEmumToKey = objectFlip(mapTaskStatusKeyToEnum, parseInt)
