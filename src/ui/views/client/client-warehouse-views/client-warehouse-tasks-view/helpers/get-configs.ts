import {
  mapTaskOperationTypeEnumToKey,
  mapTaskOperationTypeKeyToEnum,
  taskOperationTypeTranslate,
} from '@constants/task/task-operation-type'
import { mapTaskPriorityStatusEnum, taskPriorityStatusTranslate } from '@constants/task/task-priority-status'
import { TaskStatusTranslate, mapTaskStatusKeyToEnum } from '@constants/task/task-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IStorekeeper } from '@typings/models/storekeepers/storekeeper'

export const getPriorityConfig = () => {
  const defaultConfig = Object.keys(mapTaskPriorityStatusEnum)?.map(el => ({
    label: taskPriorityStatusTranslate(
      mapTaskPriorityStatusEnum[el as unknown as keyof typeof mapTaskPriorityStatusEnum],
    ),
    value: el,
  }))

  defaultConfig?.unshift({
    label: t(TranslationKey['All priorities']),
    value: undefined as unknown as string,
  })

  return defaultConfig
}

export const getStatusConfig = () => {
  const defaultConfig = Object.keys(mapTaskStatusKeyToEnum)?.map(el => ({
    label: TaskStatusTranslate(mapTaskStatusKeyToEnum[el as unknown as keyof typeof mapTaskStatusKeyToEnum]),
    value: el,
  }))

  defaultConfig?.unshift({
    label: t(TranslationKey['All statuses']),
    value: undefined as unknown as string,
  })

  return defaultConfig
}

export const getStorekeepersConfig = (storekeepersData: IStorekeeper[]) => {
  const defaultConfig = storekeepersData?.map(storekeeper => ({
    label: storekeeper.name,
    value: storekeeper._id,
  }))

  defaultConfig?.unshift({
    label: t(TranslationKey['All warehouses']) || '',
    value: undefined as unknown as string,
  })

  return defaultConfig
}

export const getTypeConfig = () => {
  const defaultConfig = Object.keys(mapTaskOperationTypeKeyToEnum)?.map(el => ({
    label: taskOperationTypeTranslate(
      mapTaskOperationTypeEnumToKey[el as unknown as keyof typeof mapTaskOperationTypeEnumToKey],
    ),
    value: el,
  }))

  defaultConfig?.unshift({
    label: t(TranslationKey['All tasks']),
    value: undefined as unknown as string,
  })

  return defaultConfig
}
