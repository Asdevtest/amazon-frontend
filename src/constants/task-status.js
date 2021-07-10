import {objectFlip} from '@utils/object'

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

export const mapTaskStatusEmumToKey = objectFlip(mapTaskStatusKeyToEnum, parseInt)
