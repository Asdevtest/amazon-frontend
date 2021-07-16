import {objectFlip} from '@utils/object'

export const TaskOperationType = {
  MERGE: 'merge',
  SPLIT: 'split',
  RECEIVE: 'receive',
}

export const mapTaskOperationTypeKeyToEnum = {
  merge: TaskOperationType.MERGE,
  split: TaskOperationType.SPLIT,
  receive: TaskOperationType.RECEIVE,
}

export const mapTaskOperationTypeToLabel = {
  [TaskOperationType.MERGE]: 'Соединить',
  [TaskOperationType.SPLIT]: 'Разъединить',
  [TaskOperationType.RECEIVE]: 'Принять',
}

export const mapTaskOperationTypeEnumToKey = objectFlip(mapTaskOperationTypeKeyToEnum)
