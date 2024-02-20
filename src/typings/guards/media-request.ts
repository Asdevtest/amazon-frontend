import { IMediaRequest } from '@typings/shared/upload-file'
import { TypeGuard } from '@typings/type-guard'

import { isUploadFileType } from './upload-file'

export const isMediaRequest: TypeGuard<IMediaRequest> = (value: unknown): value is IMediaRequest => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const { image, comment, commentByClient, _id } = value as IMediaRequest

  return (
    isUploadFileType(image) &&
    (typeof comment === 'string' || comment === null) &&
    (typeof commentByClient === 'string' || commentByClient === null) &&
    typeof _id === 'string'
  )
}
