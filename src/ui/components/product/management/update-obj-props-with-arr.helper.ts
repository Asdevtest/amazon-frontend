/* eslint-disable @typescript-eslint/no-explicit-any */

import { MembersType, MemberType } from './management.types'

export const updateObjPropsWithArr = (obj: MembersType, arr: MemberType[][]) => {
  const updatedObj = { ...obj }

  Object.keys(updatedObj).forEach((key, index) => {
    updatedObj[key] = arr[index]
  })

  return updatedObj
}
