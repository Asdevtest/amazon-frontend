import { t } from 'i18n-js'

import { objectFlip } from '@utils/object'

import { TranslationKey } from '../translations/translation-key'

export const TaskOperationType = {
  MERGE: 'merge',
  SPLIT: 'split',
  RECEIVE: 'receive',
  EDIT: 'edit',
  EDIT_BY_STOREKEEPER: 'storekeeperEditBoxes',
}

export const mapTaskOperationTypeKeyToEnum = {
  merge: TaskOperationType.MERGE,
  split: TaskOperationType.SPLIT,
  receive: TaskOperationType.RECEIVE,
  edit: TaskOperationType.EDIT,
  storekeeperEditBoxes: TaskOperationType.EDIT_BY_STOREKEEPER,
}

export const mapTaskOperationTypeToLabel = {
  [TaskOperationType.MERGE]: 'Соединить',
  [TaskOperationType.SPLIT]: 'Разделить',
  [TaskOperationType.RECEIVE]: 'Принять',
  [TaskOperationType.EDIT]: 'Изменить',
  [TaskOperationType.EDIT_BY_STOREKEEPER]: 'Изменение складом',
}

export const taskOperationTypeTranslate = value => {
  switch (value) {
    case TaskOperationType.MERGE:
      return t(TranslationKey.Merge)
    case TaskOperationType.SPLIT:
      return t(TranslationKey.Split)
    case TaskOperationType.RECEIVE:
      return t(TranslationKey.Receive)
    case TaskOperationType.EDIT:
      return t(TranslationKey.Edit)
    case TaskOperationType.EDIT_BY_STOREKEEPER:
      return t(TranslationKey['Edited by storekeeper'])
  }
}

export const mapTaskOperationTypeEnumToKey = objectFlip(mapTaskOperationTypeKeyToEnum)
