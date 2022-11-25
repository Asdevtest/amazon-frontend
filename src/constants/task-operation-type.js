import {objectFlip} from '@utils/object'

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

export const mapTaskOperationTypeEnumToKey = objectFlip(mapTaskOperationTypeKeyToEnum)
