/* eslint-disable @typescript-eslint/no-explicit-any */

import { cloneDeep } from '@utils/object'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { ObjWithProps } from './management.types'

export const updateObjPropsWithArr = (obj: ObjWithProps, arr: any[]) => {
  let index = 0
  const updatedObj = cloneDeep(obj)

  for (const key in updatedObj) {
    if (updatedObj.hasOwnProperty.call(updatedObj, key)) {
      updatedObj[key] = arr[index]?.status === loadingStatuses.fulfilled ? arr[index]?.value : []
      index++
    }
  }

  return updatedObj
}
